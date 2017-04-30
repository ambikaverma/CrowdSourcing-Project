var canvas = $("canvas")[0];
var context;
var canvasImg;

/*************************************************************************************
 * http://stackoverflow.com/questions/27339747/zoom-and-pan-in-animated-html5-canvas *
 ************************************************************************************/
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

  canvas.addEventListener("DOMMouseScroll", handleScroll, false);
  canvas.addEventListener("mousewheel", handleScroll, false);
}

function setScale(newScale) {
  scale = newScale;
  imgWidth = parseInt(iw * scale);
  imgHeight = parseInt(ih * scale);    
  imgLeft = parseInt(focusX - focusX1 * scale);
  imgTop = parseInt(focusY - focusY1 * scale);
}

function setFocus(mx, my) {
  focusX = mx;
  focusY = my;
  focusX1 = parseInt((mx - imgLeft) / scale);
  focusY1 = parseInt((my - imgTop) / scale);
}

function drawImg() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.save();

  context.drawImage(canvasImg, 0, 0, iw, ih, imgLeft, imgTop, imgWidth, imgHeight);

  context.restore();
}

function handleScroll(e) {
  e.preventDefault();
  e.stopPropagation();

  mouseX = parseInt(e.clientX - offsetX);
  mouseY = parseInt(e.clientY - offsetY);
  setFocus(mouseX, mouseY);

  var delta = e.wheelDelta ?  e.wheelDelta / 30 : e.detail ? -e.detail : 0;
  if (delta) {
    counter += delta;
    setScale(1 + counter / 100);
    drawImg();
  }
};
/************************************************************************************/

function loadImage(labels) {
  context = canvas.getContext("2d");
  var imgObj = new Image();
  imgObj.onload = function() {
    var width = this.width;
    var height = this.height;

    canvas.width = width;
    canvas.height = height;

    context.drawImage(imgObj, 0, 0, width, height);
    init(this);
  }
  imgObj.src = currentImgSrc;
}

$(canvas).click(function() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(canvasImg, 0, 0, canvas.width, canvas.height);

  imgLeft = 0;
  imgTop = 0;
  scale = 1.00;

  setFocus(iw / 2 * scale, ih / 2 * scale);

  setScale(scale);
});