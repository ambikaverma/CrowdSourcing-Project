var canvas, context, startX, endX, startY, endY;
var mouseIsDown = 0;

function init() {
  canvas = $("canvas")[0];

  $("canvas").mousedown(mouseDown);
  $("canvas").mousemove(mouseXY);
  $("canvas").mouseup(mouseUp);
}

function mouseUp(eve) {
  if (mouseIsDown !== 0) {
    mouseIsDown = 0;
    var pos = getMousePos(canvas, eve);
    endX = pos.x;
    endY = pos.y;
    drawSquare(); //update on mouse-up
  }
}

function mouseDown(eve) {
  mouseIsDown = 1;
  var pos = getMousePos(canvas, eve);
  startX = endX = pos.x;
  startY = endY = pos.y;
  drawSquare(); //update
}

function mouseXY(eve) {
  if (mouseIsDown !== 0) {
    var pos = getMousePos(canvas, eve);
    endX = pos.x;
    endY = pos.y;

    drawSquare();
  }
}

function drawSquare() {
  // creating a square
  var w = endX - startX;
  var h = endY - startY;
  var offsetX = (w < 0) ? w : 0;
  var offsetY = (h < 0) ? h : 0;
  var width = Math.abs(w);
  var height = Math.abs(h);

  context.clearRect(0, 0, canvas.width, canvas.height);
  // loadImage();
             
  context.beginPath();
  context.rect(startX + offsetX, startY + offsetY, width, height);
  context.lineWidth = 3;
  context.strokeStyle = "red";
  context.stroke();
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

init();

function loadImage() {
  $("img").attr("src", "../../samples/" + currentImg + ".jpg");
  $("img").css("display", "block"); // workaround for getting image dimensions

  context = canvas.getContext("2d");
  var imgObj = new Image();
  imgObj.onload = function() {
    var width = $("img").width();
    var height = $("img").height();

    canvas.width = width;
    canvas.height = height;

    context.drawImage(imgObj, 0, 0, width, height);
    $("img").css("display", "none"); // workaround for getting image dimensions
  }
  imgObj.src = currentImgSrc;
}

$("#resetBox").click(function() {

});