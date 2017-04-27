var canvas = $("canvas")[0];
var context;
var canvasImg;

var canvasOffset = $(canvas).offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;

var counter = 1;
var PI2 = Math.PI * 2;
var iw, ih;
var imgLeft, imgTop, imgWidth, imgHeight;
var focusX, focusY, focusX1, focusY1;
var scale;

function init(imgObj) {
  canvasImg = imgObj;

  iw = canvasImg.width;
  ih = canvasImg.height;

  imgLeft = 0;
  imgTop = 0;
  scale = 1.00;

  setFocus(iw / 2 * scale, ih / 2 * scale);

  setScale(scale);

  drawImg();

  $(canvas).mousedown(function(e){handleMouseDown(e);});

  canvas.addEventListener('DOMMouseScroll',handleScroll,false);
  canvas.addEventListener('mousewheel',handleScroll,false);
}

function setScale(newScale) {
  scale = newScale;
  imgWidth = parseInt(iw * scale);
  imgHeight = parseInt(ih * scale);    
  imgLeft = parseInt(focusX - focusX1 * scale);
  imgTop = parseInt(focusY - focusY1 * scale);
  drawImg();
}

function setFocus(mx, my) {
  focusX = mx;
  focusY = my;
  focusX1 = parseInt((mx - imgLeft) / scale);
  focusY1=parseInt((my - imgTop) / scale);
  drawImg();
}

function drawImg() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.save();
  context.drawImage(canvasImg, 0, 0, iw, ih, imgLeft, imgTop, imgWidth, imgHeight);
  dot(context, focusX, focusY, "red");
  context.restore();
}

function dot(context, x, y, fill) {
  context.beginPath();
  context.arc(x, y, 4, 0, PI2);
  context.closePath();
  context.fillStyle = fill;
  context.fill();
  context.lineWidth = 2;
  context.stroke();
}

function handleScroll(e) {
  e.preventDefault();
  e.stopPropagation();

  var delta = e.wheelDelta ?  e.wheelDelta / 30 : e.detail ? -e.detail : 0;
  if (delta) {
    counter += delta;
    setScale(1 + counter / 100);
  }
};

function handleMouseDown(e) {
  e.preventDefault();
  e.stopPropagation();
  mouseX = parseInt(e.clientX - offsetX);
  mouseY = parseInt(e.clientY - offsetY);
  setFocus(mouseX, mouseY);
  drawImg();
}

function loadImage(labels) {
  $("img").attr("src", "../../samples/" + currentImg + ".jpg");
  $("img").css("display", "block"); // workaround for getting image dimensions

  context = canvas.getContext("2d");
  var imgObj = new Image();
  imgObj.onload = function() {
    // console.log(imgObj.width, imgObj.height)
    console.log(this)
    console.log(this.width, this.height)

    var width = $("img").width();
    var height = $("img").height();

    canvas.width = width;
    canvas.height = height;

    context.drawImage(imgObj, 0, 0, width, height);
    $("img").css("display", "none"); // workaround for getting image dimensions
  }
  imgObj.src = currentImgSrc;

  init(imgObj);
}