$(document).ready(function() {
  $("#prev").click(function() {
    if (current != 0) {
      current -= 1;
      prepImg();
    }
  });

  $("#next").click(function() {
    nextImg(checkAnswers(), false);
  });

  $("#issue").click(function() {
    nextImg(true, true);
  });

  $("#submit-cancel").click(function() {
    $("#feedback").css("display", "none");
  });

  $(window).click(function(event) {
    if (event.target == $("#feedback")[0]) {
      $("#feedback").css("display", "none");
    }
  });

  $("#submitButton").click(function() {
    $("<input />")
      .attr("type", "hidden")
      .attr("name", "labels")
      .attr("value", JSON.stringify(workerAnswers))
      .appendTo("#mturk_form");
  });

  function checkAnswers() {
    var prelabel = $("input[type=radio]:checked")[0];

    if (!prelabel) {
      alert("Please verify the predicted label.");
      return false;
    } else if (currentLabels.verifiedLabel && $(prelabel).val() == "yes") {
      alert("There should only be one correct label.");
      return false;
    } else if (!currentLabels.verifiedLabel && $(prelabel).val() == "no") {
      alert("Please add the correct label.");
      return false;
    } else if (notDrawn) {
      alert("Please make sure you've drawn a bounding box.");
      return false;
    }
    return true;
  }

  function nextImg(ok, error) {
    if (!ok)
      return;

    if (error) {
      workerAnswers[currentImg] = "error";
      currentLabels.bbox = {};
      currentLabels.verifiedLabel = "";
    }
    else
      saveLabels();

    if (current == imgs.length - 1) {
      $("#feedback").css("display", "block");
      return;
    }

    current += 1;
    prepImg();
  }

  function saveLabels() {
    currentLabels.bbox = {
      "x": Math.floor(rect.startX),
      "y": Math.floor(rect.startY),
      "w": Math.floor(rect.w),
      "h": Math.floor(rect.h)
    };

    var data = {
      "bbox": $.extend({}, currentLabels.bbox),
      "label": currentLabels.verifiedLabel ? currentLabels.verifiedLabel : currentLabels.prelabel
    };
    workerAnswers[currentImg] = data;
  } 
});