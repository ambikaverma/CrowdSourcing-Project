/*****************************************************************************/

var canvas = $("canvas")[0];
var ctx = canvas.getContext('2d'),
    rect = {},
    drag = false,
    mouseX,
    mouseY,
    closeEnough = 5,
    dragTL = dragBL = dragTR = dragBR = false;
var notDrawn = true;
var imageObj = new Image();
var colPadding = 0;

function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  loadImage(canvas);

  notDrawn = true;
  rect = {};
}

function loadCanvas(canv) {
  canvas.width = imageObj.width;
  canvas.height = imageObj.height;
  loadImage(canv);
}

function init() {
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mouseup', mouseUp, false);
  canvas.addEventListener('mousemove', mouseMove, false);
  
  $("#resetBox").click(function() {
    redraw();
  });

  imageObj.src = currentImgSrc;

  loadCanvas(canvas);
  imageObj.onload = function() {
    loadCanvas(canvas);
    draw(canvas);
  };
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function mouseDown(e) {
  mouseX = getMousePos(canvas,e).x
  mouseY = getMousePos(canvas,e).y
  notDrawn = false;

  // if there isn't a rect yet
  if (rect.w === undefined) {
      rect.startX = mouseX;
      rect.startY = mouseY;
      dragBR = true;
  }
  // top left
  else if (checkCloseEnough(mouseX, rect.startX) && checkCloseEnough(mouseY, rect.startY)) {
    dragTL = true;
  }
  // top right
  else if (checkCloseEnough(mouseX, rect.startX + rect.w) && checkCloseEnough(mouseY, rect.startY)) {
    dragTR = true;
  }
  // bottom left
  else if (checkCloseEnough(mouseX, rect.startX) && checkCloseEnough(mouseY, rect.startY + rect.h)) {
    dragBL = true;
  }
  // bottom right
  else if (checkCloseEnough(mouseX, rect.startX + rect.w) && checkCloseEnough(mouseY, rect.startY + rect.h)) {
    dragBR = true;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  loadImage(canvas);
  draw(canvas);
}

function checkCloseEnough(p1, p2) {
  return Math.abs(p1 - p2) < closeEnough;
}

function mouseUp() {
  dragTL = dragTR = dragBL = dragBR = false;
}

function mouseMove(e) {
  if (notDrawn)
    return;

  mouseX = getMousePos(canvas,e).x
  mouseY = getMousePos(canvas,e).y

  if (dragTL) {
    rect.w += rect.startX - mouseX;
    rect.h += rect.startY - mouseY;
    rect.startX = mouseX;
    rect.startY = mouseY;
  } else if (dragTR) {
    rect.w = Math.abs(rect.startX - mouseX);
    rect.h += rect.startY - mouseY;
    rect.startY = mouseY;
  } else if (dragBL) {
    rect.w += rect.startX - mouseX;
    rect.h = Math.abs(rect.startY - mouseY);
    rect.startX = mouseX;
  } else if (dragBR) {
    rect.w = Math.abs(rect.startX - mouseX);
    rect.h = Math.abs(rect.startY - mouseY);
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  loadImage(canvas);
  draw(canvas);
}

function draw(canv) {
  var ctx1 = canv.getContext('2d');
  ctx1.lineWidth = 3;
  ctx1.strokeStyle = "lime";
  ctx1.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
  drawHandles(ctx1);
}

function drawCircle(x, y, radius, ctx1) {
  ctx1.fillStyle = "#111111";
  ctx1.strokeStyle = "#ffffff"
  ctx1.beginPath();
  ctx1.arc(x, y, radius, 0, 2 * Math.PI);
  ctx1.fill();
  ctx1.stroke();
}

function drawHandles(ctx1) {
  drawCircle(rect.startX, rect.startY, closeEnough, ctx1);
  drawCircle(rect.startX + rect.w, rect.startY, closeEnough, ctx1);
  drawCircle(rect.startX + rect.w, rect.startY + rect.h, closeEnough, ctx1);
  drawCircle(rect.startX, rect.startY + rect.h, closeEnough, ctx1);
}

function loadImage(canv) {
  var ctx1 = canvas.getContext('2d');
  ctx1.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height,
                 0, 0, canv.width, canv.height);
}

/*****************************************************************************/

function load() {
  if (currentLabels.bbox.x) {
    rect.startX = currentLabels.bbox.x;
    rect.startY = currentLabels.bbox.y;
    rect.w = currentLabels.bbox.w;
    rect.h = currentLabels.bbox.h;

    notDrawn = false;
  }
  init();
}