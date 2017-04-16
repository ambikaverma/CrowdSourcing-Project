var imgs = [];
var current = 0;
var currentImg = -1;
var addedCategories = [];
var workerLabels = {};

(function(key) {
  var regexS = "[\\?&]" + key + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var tmpURL = window.location.href;
  var results = regex.exec(tmpURL);
  if(results != null) {
    imgs = results[1].split(",");
    currentImg = imgs[current];
    prepImg();
  }
})("imgs");

function prepImg() {
  $(".label").remove()
  $("#confidenceRange").val(3)

  $("img").attr("src", "../samples/" + currentImg + ".jpg");

  if (workerLabels[currentImg])
    getWorkerLabels();
  else
    getPreLabels();
}

function getWorkerLabels() {

}

function getPreLabels() {
  workerLabels[currentImg] = {
    "addedCategories": []
  };

  var labels = prelabels[currentImg];
  $.each(labels, function(i, val) {
    var label = mappings[val];
    workerLabels[currentImg].addedCategories.push(label);
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