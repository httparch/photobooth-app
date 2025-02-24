var captureButton = document.getElementById('snapPicture');
var video = document.getElementById("webcam");
const imageContainer = document.querySelector(".image-container");

captureButton.addEventListener('click', capturedPic);

navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 }, audio: false })
  .then((stream) => {
    video.srcObject = stream;
    video.play();
  })
  .catch((err) => {
    console.error(`The following error occurred: ${err.name}`);
  });

function capturedPic() {
  const canvas = document.createElement('canvas')
  canvas.classList.add("captured")
  var context = canvas.getContext("2d");
  canvas.width = 200;
  canvas.height = 150;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  imageContainer.appendChild(canvas)
}
