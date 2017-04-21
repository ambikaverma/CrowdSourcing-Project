/******************************************************************************
 * http://stackoverflow.com/questions/15195449/html5-type-range-showing-label *
 *****************************************************************************/
var confidenceLabels = {
  "1": "(Not at all)",
  "2": "(Not very)",
  "3": "(Somewhat)",
  "4": "(Very)",
  "5": "(Completely)"
};

$(function () {
  $("#confidenceLabel").text(confidenceLabels[$("#confidenceRange").val()]);

  $("#confidenceRange").on("input change", function () {
    setConfidenceLabel();
  });
});

function setConfidenceLabel() {
	$("#confidenceLabel").text(confidenceLabels[$("#confidenceRange").val()]);
}