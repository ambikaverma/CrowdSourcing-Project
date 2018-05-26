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

  $("textarea[name='caption']").val("");

  currentImgSrc = "../../images/" + currentImg + ".jpg";
  $("img").first().attr("src", currentImgSrc);

  $("#counter").text(current + 1);

  if (workerLabels[currentImg])
    getWorkerLabels();
  else
    getPreLabels();
}

function getWorkerLabels() {
  currentLabels = workerLabels[currentImg];

  $("textarea[name='caption']").val(currentLabels);
}

function getPreLabels() {
  workerLabels[currentImg] = "";
  currentLabels = workerLabels[currentImg];
}
