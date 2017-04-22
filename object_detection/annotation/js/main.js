var imgs = [];
var current = 0;
var currentImg = -1;
var currentLabels = {};
var workerLabels = {};
var workerAnswers = {};
var context;

(function(key) {
  var regexS = "[\\?&]" + key + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var tmpURL = window.location.href;
  tmpURL = decodeURIComponent(tmpURL);
  var results = regex.exec(tmpURL);
  if(results != null) {
    imgs = results[1].split(",");
    currentImg = imgs[current];
    $("#total").text(imgs.length);
    prepImg();
  }
})("imgs");

function prepImg() {
  currentImg = imgs[current];

  $(".label").remove()
  $("#confidenceRange").val(3)
  setConfidenceLabel();

  loadImage(context);

  $("#counter").text(current + 1);

  if (workerLabels[currentImg])
    getWorkerLabels();
  else
    getPreLabels();
}

function loadImage(context) {
  $("img").attr("src", "../../samples/" + currentImg + ".jpg");
  $("img").css("display", "block"); // workaround for getting image dimensions

  var canvas = $("canvas")[0];
  context = canvas.getContext("2d");
  var imgObj = new Image();
  imgObj.onload = function() {
    var width = $("img").width();
    var height = $("img").height();

    // context.clearRect(0, 0, width, height);
    canvas.width = width;
    canvas.height = height;

    context.drawImage(imgObj, 0, 0, width, height);
    $("img").css("display", "none"); // workaround for getting image dimensions
  }
  imgObj.src = "../../samples/" + currentImg + ".jpg";

}

function getWorkerLabels() {
  currentLabels = workerLabels[currentImg];

  $.each(currentLabels.addedCategories, function(i, val) {
    addObj(val)
  });

  $("#confidenceRange").val(currentLabels.confidence);
  setConfidenceLabel();
}

function getPreLabels() {
  workerLabels[currentImg] = {
    "addedCategories": [],
    "positives": [],
    "confidence": 3
  };
  currentLabels = workerLabels[currentImg];
}
