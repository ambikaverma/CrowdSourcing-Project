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
    prepImg();
  }
})("imgs");

function prepImg() {
  currentImg = imgs[current];

  $(".label").remove()
  $("#confidenceRange").val(3)
  setConfidenceLabel();

  $("img").attr("src", "../samples/" + currentImg + ".jpg");

  if (workerLabels[currentImg])
    getWorkerLabels();
  else
    getPreLabels();
}

function getWorkerLabels() {
  currentLabels = workerLabels[currentImg];

  $.each(currentLabels.prelabels, function(i, val) {
    $("#inputs").prepend(
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
      addObj(val)
  });

  $("#confidenceRange").val(currentLabels.confidence);
  setConfidenceLabel();
}

function getPreLabels() {
  workerLabels[currentImg] = {
    "prelabels": [],
    "addedCategories": [],
    "positives": [],
    "negatives": [],
    "confidence": 3
  };
  currentLabels = workerLabels[currentImg];

  var labels = prelabels[currentImg];
  $.each(labels, function(i, val) {
    var label = mappings[val];
    currentLabels.prelabels.push(label);
    currentLabels.addedCategories.push(label);
    $("#inputs").prepend(
      "<tr class='label'>" +
        "<td>" + label + "</td>" +
        "<td><input type='radio' name='" + label + "' value='yes'>&nbsp;Yes" +
        "&nbsp;&nbsp;" +
        "<input type='radio' name='" + label + "' value='no'>&nbsp;No</td>" +
      "</tr>"
    );
  });
}
