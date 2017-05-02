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
    $("#confidenceRange").remove();

    $("<input />")
      .attr("type", "hidden")
      .attr("name", "labels")
      .attr("value", JSON.stringify(workerAnswers))
      .appendTo("#mturk_form");
  });

  function checkAnswers() {
    if (!drawn) {
      alert("Please make sure you've drawn a bounding box.");
      return false;
    } else if (!(endX - startX) || !(endY - startY)) {
      alert("Please click 'reset' and redraw your bounding box.")
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
      currentLabels.confidence = 3;
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
      "startX": Math.floor(startX),
      "endX": Math.floor(endX),
      "startY": Math.floor(startY),
      "endY": Math.floor(endY)
    }
    currentLabels.confidence = parseInt($("#confidenceRange").val());

    var data = {
      "bbox": {
        "x": Math.min(currentLabels.bbox.startX, currentLabels.bbox.endX),
        "y": Math.min(currentLabels.bbox.startY, currentLabels.bbox.endY),
        "width": Math.abs(currentLabels.bbox.endX - currentLabels.bbox.startX),
        "height": Math.abs(currentLabels.bbox.endY - currentLabels.bbox.startY)
      },
      "confidence": currentLabels.confidence
    }
    workerAnswers[currentImg] = data;
  } 
});