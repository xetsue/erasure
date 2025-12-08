(function(global) {
    const AE_ONNX = {};

    async function fetchModelWithProgress(url, onProgress, signal) {
        const response = await fetch(url, { signal });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const contentLength = response.headers.get('content-length');
        const total = parseInt(contentLength, 10);
        let loaded = 0;

        const res = new Response(new ReadableStream({
            async start(controller) {
                const reader = response.body.getReader();
                while (true) {
                    const {done, value} = await reader.read();
                    if (done) break;
                    loaded += value.byteLength;
                    if (total) {
                        const percent = Math.round((loaded / total) * 100);
                        onProgress(`Downloading Model: ${percent}%`);
                    } else {
                        onProgress(`Downloading Model: ${(loaded/1024/1024).toFixed(1)}MB`);
                    }
                    controller.enqueue(value);
                }
                controller.close();
            }
        }));
        return res.arrayBuffer();
    }

    async function getScale(session, size) {
        const testFloat32 = new Float32Array(3 * size * size).fill(0.5);
        const inputTensor = new ort.Tensor('float32', testFloat32, [1, 3, size, size]);
        const feeds = {};
        feeds[session.inputNames[0]] = inputTensor;
        const results = await session.run(feeds);
        const dims = results[session.outputNames[0]].dims;
        
        let outW;
        if(dims.length === 4) outW = dims[3];
        else if(dims.length === 3) outW = dims[2];
        else throw new Error("Unknown output rank");
        
        return outW / size;
    }

    async function processOnnxTiled(session, imgData, ctx, finalScale, signal, config) {
        const width = imgData.width;
        const height = imgData.height;
        const previewCtx = config.previewCtx;
        const previewW = config.previewCanvas.width;
        const previewH = config.previewCanvas.height;

        if(previewCtx) {
            previewCtx.lineWidth = 3;
            previewCtx.strokeStyle = 'white';
            config.previewCanvas.style.display = 'block';
        }

        let tileSize = config.tileSize || 128;
        let scale = 0;
        let usedTileSize = tileSize;
        
        try {
            scale = await getScale(session, tileSize);
        } catch(e) {
            try { scale = await getScale(session, 256); usedTileSize = 256; }
            catch(e2) {
                try { scale = await getScale(session, 128); usedTileSize = 128; }
                catch(e3) {
                    scale = 4; usedTileSize = 128;
                }
            }
        }
        
        tileSize = usedTileSize;
        
        const finalW = Math.floor(width * finalScale);
        const finalH = Math.floor(height * finalScale);
        
        ctx.canvas.width = finalW;
        ctx.canvas.height = finalH;
        if(config.resizeCanvas) config.resizeCanvas(); 

        const padW = Math.ceil(width / tileSize) * tileSize;
        const padH = Math.ceil(height / tileSize) * tileSize;
        
        const padCanvas = document.createElement('canvas');
        padCanvas.width = padW;
        padCanvas.height = padH;
        const pCtx = padCanvas.getContext('2d');
        pCtx.drawImage(await createImageBitmap(imgData), 0, 0, width, height);
        if(width < padW) pCtx.drawImage(padCanvas, width-1, 0, 1, height, width, 0, padW-width, height);
        if(height < padH) pCtx.drawImage(padCanvas, 0, height-1, padW, 1, 0, height, padW, padH-height);

        const paddedData = pCtx.getImageData(0, 0, padW, padH).data;
        const totalTiles = (padW / tileSize) * (padH / tileSize);
        let tilesProcessed = 0;
        let avgTimePerTile = 0;

        for (let y = 0; y < padH; y += tileSize) {
            for (let x = 0; x < padW; x += tileSize) {
                if (signal.aborted) throw new Error("Aborted");
                let tileStart = performance.now();
                
                tilesProcessed++;
                if(config.onProgress) config.onProgress(`Tile ${tilesProcessed}/${totalTiles}`);
                
                const tileFloat32 = new Float32Array(3 * tileSize * tileSize);
                for (let ty = 0; ty < tileSize; ty++) {
                    for (let tx = 0; tx < tileSize; tx++) {
                        const srcIdx = ((y + ty) * padW + (x + tx)) * 4;
                        const destIdx = ty * tileSize + tx;
                        tileFloat32[destIdx] = paddedData[srcIdx] / 255.0;
                        tileFloat32[destIdx + tileSize * tileSize] = paddedData[srcIdx + 1] / 255.0;
                        tileFloat32[destIdx + 2 * tileSize * tileSize] = paddedData[srcIdx + 2] / 255.0;
                    }
                }

                const tTensor = new ort.Tensor('float32', tileFloat32, [1, 3, tileSize, tileSize]);
                const tFeeds = {};
                tFeeds[session.inputNames[0]] = tTensor;
                
                const tResults = await session.run(tFeeds);
                const tOut = tResults[session.outputNames[0]].data;

                const tileNativeW = Math.floor(tileSize * scale);
                const tileNativeH = Math.floor(tileSize * scale);
                const tileImgData = new ImageData(tileNativeW, tileNativeH);
                const d = tileImgData.data;

                for (let i = 0; i < tileNativeW * tileNativeH; i++) {
                    const r = tOut[i] * 255.0;
                    const g = tOut[i + tileNativeW * tileNativeH] * 255.0;
                    const b = tOut[i + 2 * tileNativeW * tileNativeH] * 255.0;
                    d[i * 4] = Math.max(0, Math.min(255, r));
                    d[i * 4 + 1] = Math.max(0, Math.min(255, g));
                    d[i * 4 + 2] = Math.max(0, Math.min(255, b));
                    d[i * 4 + 3] = 255;
                }

                const tCan = document.createElement('canvas');
                tCan.width = tileNativeW; tCan.height = tileNativeH;
                tCan.getContext('2d').putImageData(tileImgData, 0, 0);
                
                const destX = Math.floor(x * finalScale);
                const destY = Math.floor(y * finalScale);
                const destW = Math.ceil(tileSize * finalScale);
                const destH = Math.ceil(tileSize * finalScale);
                
                ctx.drawImage(tCan, 0, 0, tileNativeW, tileNativeH, destX, destY, destW, destH);

                if(previewCtx) {
                    previewCtx.clearRect(0,0, previewW, previewH);
                    previewCtx.strokeRect(x, y, tileSize, tileSize);
                }
                
                let tileEnd = performance.now();
                let dur = tileEnd - tileStart;
                if (avgTimePerTile === 0) avgTimePerTile = dur;
                else avgTimePerTile = (avgTimePerTile * 0.7) + (dur * 0.3);
                
                let remaining = totalTiles - tilesProcessed;
                let eta = (remaining * avgTimePerTile) / 1000;
                let etaStr = eta > 60 ? `${Math.floor(eta/60)}m ${Math.floor(eta%60)}s` : `${Math.floor(eta)}s`;
                if(config.onEstimation) config.onEstimation(`Est: ${etaStr}`);
                
                await new Promise(r => requestAnimationFrame(r));
            }
        }
        
        if(previewCtx) {
            previewCtx.clearRect(0,0, previewW, previewH);
            config.previewCanvas.style.display = 'none';
        }
        return ctx.getImageData(0, 0, finalW, finalH);
    }

    AE_ONNX.run = async function(imgData, modelName, config) {
        const onProgress = config.onProgress || function(){};
        const signal = config.signal;
        
        onProgress("DL Model...");
        
        const modelBuffer = await fetchModelWithProgress(`./src/models/${modelName}`, onProgress, signal);
        onProgress("Loading Wasm");
        
        let session;
        let useWasm = false;
        
        try {
            const providers = ['webgpu', 'webgl']; 
            session = await ort.InferenceSession.create(modelBuffer, { 
                executionProviders: providers,
                graphOptimizationLevel: 'all'
            });
            await getScale(session, 64);
        } catch (gpuErr) {
            useWasm = true;
        }
        
        if (useWasm) {
            onProgress("Loading Wasm");
            if(session) { try { await session.release(); } catch(e){} }
            
            session = await ort.InferenceSession.create(modelBuffer, { 
                executionProviders: ['wasm'],
                graphOptimizationLevel: 'all'
            });
        }
        
        onProgress("Inference...");
        
        const finalScale = config.scale || 1.0;
        
        try {
            const resultImgData = await processOnnxTiled(session, imgData, config.ctx, finalScale, signal, config);
            return resultImgData;
        } catch(tileErr) {
            if (!useWasm && tileErr.message !== "Aborted") {
                onProgress("Loading Wasm");
                if(session) { try { await session.release(); } catch(e){} }
                
                session = await ort.InferenceSession.create(modelBuffer, { 
                    executionProviders: ['wasm']
                });
                return await processOnnxTiled(session, imgData, config.ctx, finalScale, signal, config);
            } else {
                throw tileErr;
            }
        }
    };

    global.AE_ONNX = AE_ONNX;
})(window);