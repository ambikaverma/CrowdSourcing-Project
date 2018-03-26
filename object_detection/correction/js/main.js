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

  $(".label").remove()

  var label = prelabels[currentImg].label;
  $("#prelabel").text(label);
  $("#inputs tr:first").after(
    "<tr class='label'>" +
      "<td>" + label + "</td>" +
      "<td><input type='radio' name='" + label + "' value='yes'>&nbsp;Yes" +
      "&nbsp;&nbsp;" +
      "<input type='radio' name='" + label + "' value='no'>&nbsp;No</td>" +
    "</tr>"
  );

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

  var prelabel = currentLabels.prelabel;
  var verifiedLabel = currentLabels.verifiedLabel;
  if (!verifiedLabel) {
    if (currentLabels.bbox["startX"])
      $("input[name='" + prelabel + "'][value='yes'").prop("checked", true);
  }
  else {
    $("input[name='" + prelabel + "'][value='no'").prop("checked", true);
    addObj(verifiedLabel);
  }
}

function getPreLabels() {
  workerLabels[currentImg] = {
    "bbox": {},
    "corrected": false,
    "prelabel": prelabels[currentImg].label,
    "verifiedLabel": "",
  };
  currentLabels = workerLabels[currentImg];
}
