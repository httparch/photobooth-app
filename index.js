var video = document.getElementById("webcam");
var captureButton = document.getElementById('snapPicture');
var downloadButton = document.getElementById('download');

const imageContainer = document.querySelector(".image-container");

let timerInterval;


navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 }, audio: false })
.then((stream) => {
  video.srcObject = stream;
  video.play();
})
.catch((err) => {
  console.error(`The following error occurred: ${err.name}`);
});

function capturedPic() {
  var flag = 0;

  timerInterval = setInterval(function(){
    renderCanvas();
    flag++;

    if(flag === 3){
      clearInterval(timerInterval);
      console.log('stopped')
    }
  }, 2000)
}

function renderCanvas(){
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 150;
  canvas.classList.add("captured")
  var context = canvas.getContext("2d");
  console.log(context)
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  imageContainer.appendChild(canvas)
}

function downloadImage(){
  

}

downloadButton.addEventListener('click',downloadImage);
captureButton.addEventListener('click', capturedPic);
