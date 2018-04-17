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

$("document").ready(function() {
  $(".accordion").accordion({
    collapsible: true,
    active: 0
  });
});

function prepImg() {
  currentImg = imgs[current];

  $(".label").remove();

  currentImgSrc = "../../images/" + currentImg + ".jpg";
  $("img").first().attr("src", currentImgSrc);

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
}

function getPreLabels() {
  workerLabels[currentImg] = {
    "addedCategories": [],
    "positives": []
  };
  currentLabels = workerLabels[currentImg];
}
