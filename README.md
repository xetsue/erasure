# A/E-Lens | Erasure
<img width="1080" height="1311" alt="1000632859" src="https://github.com/user-attachments/assets/dbc3a49f-dfd7-48cc-9d58-891d8179ae9d" />

Retro inspired web-based photo editor with save files support, layer of image or text overlays, image compressor, eraser and upscaler. 

This editor is usable offline with privacy set in mind. All files are processed on your phone, your data is yours to keep. 

Happy Editing! ₍^. .^₎⟆ 
> `Work In Progress`

## Features
- Editor (Filter, Image properties adjustment, dithering)
- Overlay (Add image as overlays, remove backgrounds using chroma keys, mask blending, layer management, add texts for decoration etc)
- Modify (Eraser, Save with Compression JPG/WEBP, Offline Upscaler)
- Save files ".json" to save projects and continue where you left off anywhere anytime

## Usage

A. Direct: Use the web-app [Here](https://xetsue.github.io/erasure)

B. Offline: Download the index.html directly and open in any browser.(Without Upscaler)

C. Offline Upscaler: [ONNX Version](https://github.com/xetsue/erasure/archive/refs/heads/main.zip) .
> Unzip anywhere, open folder, Right-click in the index.html folder, open in terminal, and run `python server.py`~

> The app should now be accessible on http://localhost:8001 or 8000 in your browser.

<details>
<summary>Info</summary>
  
> Upscaler initiation needs to be loaded real time to run. On Github, the pages handles these restriction and tells your browser to simply run the upscaler locally on your phone without issues. So I made `server.py` to allow running your own local offline server with python to utilize this.

</details>

## Modifier [Experimental]
- Eraser Tool: Legacy approach to blend and remove a targeted selection in an image. 

- Legacy Upscaler: Upscale with traditional edge detection `Sobel/Prewitt/Canny` with anti-aliasing and customisable settings.

- ONNX Upscaler: Models loads locally on your browser offline without third party processing.
> The `.onnx` models may offer significantly better results but sacrifices lower speed and more memory usage.

## Eraser
><img width="1915" height="971" alt="Screenshot 2025-12-07 222114" src="https://github.com/user-attachments/assets/ded8d9de-3242-410c-991c-6e7f1434a948" />
><img width="1917" height="974" alt="Screenshot 2025-12-07 222005" src="https://github.com/user-attachments/assets/2ed3dd6e-183d-4e6c-ac80-7bb5fc0dbf85" />
><img width="1917" height="973" alt="Screenshot 2025-12-07 222139" src="https://github.com/user-attachments/assets/f568ceb0-5923-4b23-871c-37a5555667e4" />


## Legacy Upscaler
<details>
  <summary>Showcase</summary>
  
### Before
[!] The image used is in may not give the best example. 
>![field-ae lens (1) (1)](https://github.com/user-attachments/assets/a77b207d-0613-4d59-bf8d-d27bef23fddf)
---
### After
! Please also note that the default upscaler (result below) uses edge detection and anti aliasing to process images without `onnx` — its capabilities are limited to mathematical process. Both options runs entirely offline in your browser. 

><img width="2048" height="1147" alt="field-ae lens" src="https://github.com/user-attachments/assets/b53401ea-9dd0-4aa3-b9d5-e6b9dea20ec9" />

![MixCollage-07-Dec-2025-11-01-PM-6908](https://github.com/user-attachments/assets/6078e2d9-be39-41fd-8f44-fa96bf1b025f)

</details>

## Editor
<details><summary>Screenshots</summary>
  
><img width="1917" height="970" alt="Screenshot 2025-12-07 230400" src="https://github.com/user-attachments/assets/2ef49853-ae8d-4fa5-b64a-e70d039dff1b" />
><img width="1919" height="976" alt="Screenshot 2025-12-07 230454" src="https://github.com/user-attachments/assets/ddcb03ae-67f2-4476-b721-80bd418872ed" />
><img width="1918" height="975" alt="Screenshot 2025-12-07 230535" src="https://github.com/user-attachments/assets/af81693d-edd3-4461-b6d0-fc077de4da0e" />
><img width="1080" height="1146" alt="1000632993" src="https://github.com/user-attachments/assets/e6f675f2-41d0-4151-a35f-28c8fc772cc7" />
><img width="1080" height="1184" alt="1000632991" src="https://github.com/user-attachments/assets/70634c69-a3e9-4d65-95b8-20dbcedda630" />
><img width="1080" height="1410" alt="1000632989" src="https://github.com/user-attachments/assets/91c6796b-af1a-4e6f-91d3-c2e8b0e79eae" />
</details>




### Filters Demo
This photo was made by me in Blender 2.90 and rendered out to be used on the web-app for demonstration. 

#### Original Image

><img width="1081" height="1080" alt="1000632193" src="https://github.com/user-attachments/assets/7f686cdd-8fa1-455c-8dea-6e16ef69f7f1" />

#### Processed

><img width="1081" height="1080" alt="1000632235" src="https://github.com/user-attachments/assets/4b165c92-6c86-411d-8c42-1a5226adb60f" />
><img width="1081" height="1080" alt="1000632208" src="https://github.com/user-attachments/assets/c049e6fd-b388-42de-aa05-6c4dbb1cc995" />
><img width="1081" height="1080" alt="1000632194" src="https://github.com/user-attachments/assets/e353c147-5591-4897-812d-bc27f1a1277f" />
><img width="1081" height="1080" alt="1000632190" src="https://github.com/user-attachments/assets/d4df1a36-f6f9-4188-b132-cd4a9c89fa13" />
><img width="1081" height="1080" alt="1000632191" src="https://github.com/user-attachments/assets/7b7c3238-fedb-47e8-acaf-d29087baec66" />
><img width="1081" height="1080" alt="1000632189" src="https://github.com/user-attachments/assets/37a2ee47-0f07-4f1f-acb5-bfaa94b11776" />
><img width="1081" height="1080" alt="1000632994" src="https://github.com/user-attachments/assets/ccad657d-09df-4cc1-9635-8a9f4555f474" />
><img width="1081" height="1080" alt="1000633008" src="https://github.com/user-attachments/assets/29391fb6-743d-43a1-ab83-a28460526f2f" />
><img width="1081" height="1080" alt="1000632995" src="https://github.com/user-attachments/assets/0329b9f8-e86e-4c89-8fa1-a3c1271f8fe5" />
><img width="1081" height="1080" alt="1000633001" src="https://github.com/user-attachments/assets/19b1b9cb-720f-4d9b-bce4-836a7431078d" />
><img width="1081" height="1080" alt="1000633003" src="https://github.com/user-attachments/assets/9246b694-5411-4a01-8baa-c16ebab9592a" />
><img width="1081" height="1080" alt="1000633002" src="https://github.com/user-attachments/assets/6eae779c-fbe2-4778-b245-2df66d390f7b" />
><img width="1081" height="1080" alt="1000632999" src="https://github.com/user-attachments/assets/488ac714-f69e-4bef-a6ec-df782847cd7a" />
><img width="1081" height="1080" alt="1000633000" src="https://github.com/user-attachments/assets/9233955e-335f-49a2-b6e5-08653ea9cd35" />
><img width="1081" height="1080" alt="1000632998" src="https://github.com/user-attachments/assets/a5f4e295-aea8-479d-ac86-4ec77ef41c38" />



