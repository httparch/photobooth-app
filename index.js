const video = document.getElementById("webcam");
const captureButton = document.getElementById('snapPicture');
const downloadButton = document.getElementById('download');
const colorPicker = document.getElementById("bgColor");
const canvases = document.querySelectorAll('.captured');

let timerInterval;
let captureIndex = 0;

navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 }, audio: false })
    .then((stream) => {
        video.srcObject = stream;
        video.play();
    })
    .catch((err) => {
        console.error(`The following error occurred: ${err.name}`);
    });

function captureImages() {
    captureIndex = 0;
    timerInterval = setInterval(() => {
        if (captureIndex < 3) {
            renderCanvas(canvases[captureIndex]);
            captureIndex++;
        } else {
            clearInterval(timerInterval);
            console.log('Capture completed.');
        }
    }, 2000);
}

function renderCanvas(canvas) {
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
}

function downloadImage() {
    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = 600; 
    finalCanvas.height = 200; 
    const ctx = finalCanvas.getContext("2d");

    const bgColor = colorPicker.value;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

    canvases.forEach((canvas, index) => {
        ctx.drawImage(canvas, index * 200, 25, 200, 150); 
    });

    const image = finalCanvas.toDataURL("image/png");
    downloadButton.href = image;
}


captureButton.addEventListener('click', captureImages);
downloadButton.addEventListener('click', downloadImage);
