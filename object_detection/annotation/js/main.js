var imgs = [];
var current = 0;
var currentImg = -1;
var currentImgSrc = "";
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
  drawn = 0;

  currentImg = imgs[current];

  $(".label").remove()
  $("#confidenceRange").val(3)
  setConfidenceLabel();

  var category = groundtruth[currentImg][0];
  $("#category").text(mappings[category]);

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


  $("#confidenceRange").val(currentLabels.confidence);
  setConfidenceLabel();
}

function getPreLabels() {
  workerLabels[currentImg] = {
    "bbox": {},
    "confidence": 3
  };
  currentLabels = workerLabels[currentImg];
}
