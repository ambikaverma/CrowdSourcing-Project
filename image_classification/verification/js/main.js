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
  currentImg = imgs[current];

  $(".label").remove();
  $("#inputs span").remove();

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

  $.each(currentLabels.prelabels, function(i, val) {
    $("#inputs").append(
      "<tr class='label'>" +
        "<td>" + val + "</td>" +
        "<td><input type='radio' name='" + val + "' value='yes'>&nbsp;Yes" +
        "&nbsp;&nbsp;" +
        "<input type='radio' name='" + val + "' value='no'>&nbsp;No</td>" +
      "</tr>"
    );

    if (currentLabels.positives.indexOf(val) > -1)
      $("input:radio[name=" + val + "]").filter("[value=yes]").attr("checked", true);
    else if (currentLabels.negatives.indexOf(val) > -1)
      $("input:radio[name=" + val + "]").filter("[value=no]").attr("checked", true);
  });

  $.each(currentLabels.addedCategories, function(i, val) {
    if (currentLabels.prelabels.indexOf(val) == -1)
      addObj(val);
  });
}

function getPreLabels() {
  workerLabels[currentImg] = {
    "prelabels": [],
    "addedCategories": [],
    "positives": [],
    "negatives": [],
    "noPredictions": false
  };
  currentLabels = workerLabels[currentImg];

  var labels = prelabels[currentImg];

  if (!labels) {
    currentLabels.noPredictions = true;
    $("#inputs").append("<span class='important'><b>No predictions provided, just click Next!</b></span>");
    return;
  }

  $.each(labels, function(i, val) {
    var label = i;
    currentLabels.prelabels.push(label);
    currentLabels.addedCategories.push(label);
    $("#inputs").append(
      "<tr class='label'>" +
        "<td>" + label + "</td>" +
        "<td><input type='radio' name='" + label + "' value='yes'>&nbsp;Yes" +
        "&nbsp;&nbsp;" +
        "<input type='radio' name='" + label + "' value='no'>&nbsp;No</td>" +
      "</tr>"
    );
  });
}
