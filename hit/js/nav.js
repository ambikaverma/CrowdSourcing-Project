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
    $(".label, input[type=checkbox]").remove();
  });

  function checkAnswers() {
    if (!currentLabels.addedCategories.length) {
      alert("Please make sure you've selected YES or NO for each category.");
      return false;
    }

    var answersOk = true;
    $.each(currentLabels.addedCategories, function(i, val) {
      if (!$("input:radio[name=" + val + "]:checked").val()) {
        alert("Please make sure you've selected YES or NO for each category.");
        answersOk = false;
      }
      if (!answersOk)
        return answersOk;
    });
    return answersOk;
  }

  function nextImg(ok, error) {
    if (!ok)
      return;

    if (error) {
      currentLabels.addedCategories = currentLabels.prelabels.slice();
      currentLabels.positives = [];
      currentLabels.negatives = [];
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
    currentLabels.positives = [];
    currentLabels.negatives = [];

    $.each(currentLabels.addedCategories, function(i, val) {
      var response = $("input:radio[name=" + val + "]:checked").val();
      if (response == "yes")
        currentLabels.positives.push(val);
      else
        currentLabels.negatives.push(val);
    });

    currentLabels.confidence = parseInt($("#confidenceRange").val());

    var data = {
      "positives": currentLabels.positives.slice,
      "confidence": currentLabels.confidence
    }
    $.each(data.positives, function(i, val) {
      data.positives[i] = mappings[val];
    });

    $("<input />")
      .attr("type", "hidden")
      .attr("name", currentImg)
      .attr("value", JSON.stringify(data))
      .appendTo("#mturk_form");
  } 
});