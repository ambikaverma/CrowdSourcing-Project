var imgs = [];
var current = 0;
var currentImg = -1;
var currentLabels = {};
var workerLabels = {};
var workerAnswers = {};

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

  $(".label").remove();
  $("#confidenceRange").val(3);
  setConfidenceLabel();

  currentImgSrc = "../../images/" + currentImg + ".jpg";
  
  $("#counter").text(current + 1);

  if (workerLabels[currentImg]) {
    getWorkerLabels();
    loadImage(true);
  } else {
    getPreLabels();
    loadImage(false);
  }
}

function getWorkerLabels() {
  currentLabels = workerLabels[currentImg];

  $.each(currentLabels.addedCategories, function(i, val) {
    addObj(val);
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
