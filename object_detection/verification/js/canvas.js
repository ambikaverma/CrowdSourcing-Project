var canvas = $("canvas")[0];
var canvasImg;

function loadImage(labels) {
  context = canvas.getContext("2d");
  var imgObj = new Image();
  imgObj.onload = function() {
    var width = this.width;
    var height = this.height;

    canvas.width = width;
    canvas.height = height;

    context.drawImage(imgObj, 0, 0, width, height);

    drawPreBox();
  }
  imgObj.src = currentImgSrc;
}

function resetPoints() {
  startX = 0;
  endX = 0;
  startY = 0;
  endY = 0;
}

function drawPreBox() {
  var bbox = prelabels[currentImg].bbox;
  var w = bbox.xmax - bbox.xmin;
  var h = bbox.ymax - bbox.ymin;
  var offsetX = (w < 0) ? w : 0;
  var offsetY = (h < 0) ? h : 0;
  var width = Math.abs(w);
  var height = Math.abs(h);

  context.beginPath();
  context.rect(bbox.xmin + offsetX, bbox.ymin + offsetY, width, height);
  context.lineWidth = 2.5;
  context.strokeStyle = "lime";
  context.stroke();
}