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

$("document").ready(function() {
  $(".accordion").accordion({
    collapsible: true,
    active: 0
  });
});

function prepImg() {
  drawn = 0;

  currentImg = imgs[current];

  $(".label").remove();
  notDrawn = true;
  rect = {};

  var category = groundtruth[currentImg][0];
  $("#category").text(mappings[category]);

  currentImgSrc = "../../images/" + currentImg + ".jpg";

  $("#counter").text(current + 1);

  if (workerLabels[currentImg]) {
    getWorkerLabels();
    load(true);
  } else {
    getPreLabels();
    load(false);
  }
}

function getWorkerLabels() {
  currentLabels = workerLabels[currentImg];
}

function getPreLabels() {
  workerLabels[currentImg] = {
    "bbox": {},
  };
  currentLabels = workerLabels[currentImg];
}
