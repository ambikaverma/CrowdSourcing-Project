var canvas = $("canvas")[0];
var canvasImg;

function init(imgObj) {
  canvasImg = imgObj;
}

function loadImage(labels) {
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

  init(imgObj);
}