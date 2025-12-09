# A/E-Lens | Erasure
Algorithmic Eraser — HTML based object eraser and image upscaler tool --- `Work In Progress`
### Usage Methods: 

A. Use the app directly [Here](https://xetsue.github.io/erasure)

B. Download the [Portable Version](https://github.com/xetsue/erasure/blob/main/.archive/1.index.html) `Without ONNX` and open in any browser.

C. [ONNX Version](https://github.com/xetsue/erasure/archive/refs/heads/main.zip) .
> Unzip anywhere, open folder, Right-click in the index.html folder, open in terminal, and run `python server.py`~

>The app should now be accessible on http://localhost:8000 or 8001 in your browser.

>Normally, this app can be downloaded offline and run by simply opening the index.html in any browser.

> Most browsers restrict direct access to device memory which the ONNX need to be loaded to for security reasons. Running your own local server with python overrides this.


## Features
- Eraser Tool: Mathematically blends and remove a targeted subject in an image with minimal background context.
- Editor: Add Filters, Dithering, Adjustments.
- Upscaler: Upscale with traditional edge detection `Sobel/Prewitt/Canny` method with anti-aliasing and customisable settings.

>Alternate Upscaler: ONNX models streamed locally on your browser offline without third party processing. The `.onnx` models may offer better results but sacrifices lower speed. 

## Eraser
><img width="1915" height="971" alt="Screenshot 2025-12-07 222114" src="https://github.com/user-attachments/assets/ded8d9de-3242-410c-991c-6e7f1434a948" />
><img width="1917" height="974" alt="Screenshot 2025-12-07 222005" src="https://github.com/user-attachments/assets/2ed3dd6e-183d-4e6c-ac80-7bb5fc0dbf85" />
><img width="1917" height="973" alt="Screenshot 2025-12-07 222139" src="https://github.com/user-attachments/assets/f568ceb0-5923-4b23-871c-37a5555667e4" />


## Upscaler
### Before
[!] The image used is in may not give the best example. The car in this photo can be a good reference subject.
>![field-ae lens (1) (1)](https://github.com/user-attachments/assets/a77b207d-0613-4d59-bf8d-d27bef23fddf)
---
### After
! Please also note that the default upscaler (result below) uses edge detection algorithm and anti aliasing to process images without `onnx` — its capabilities are limited to mathematical process entirely offline in your browser. 

><img width="2048" height="1147" alt="field-ae lens" src="https://github.com/user-attachments/assets/b53401ea-9dd0-4aa3-b9d5-e6b9dea20ec9" />

![MixCollage-07-Dec-2025-11-01-PM-6908](https://github.com/user-attachments/assets/6078e2d9-be39-41fd-8f44-fa96bf1b025f)

## Editor
><img width="1917" height="970" alt="Screenshot 2025-12-07 230400" src="https://github.com/user-attachments/assets/2ef49853-ae8d-4fa5-b64a-e70d039dff1b" />
><img width="1919" height="976" alt="Screenshot 2025-12-07 230454" src="https://github.com/user-attachments/assets/ddcb03ae-67f2-4476-b721-80bd418872ed" />
><img width="1918" height="975" alt="Screenshot 2025-12-07 230535" src="https://github.com/user-attachments/assets/af81693d-edd3-4461-b6d0-fc077de4da0e" />
