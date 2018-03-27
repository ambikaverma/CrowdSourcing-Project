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

    $("<input />")
      .attr("type", "hidden")
      .attr("name", "labels")
      .attr("value", JSON.stringify(workerAnswers))
      .appendTo("#mturk_form");
  });

  function checkAnswers() {
    if (!currentLabels.addedCategories.length) {
      alert("Please make sure you've added at least one category.");
      return false;
    }
    return true;
  }

  function nextImg(ok, error) {
    if (!ok)
      return;

    if (error) {
      workerAnswers[currentImg] = "error";
      currentLabels.addedCategories = [];
      currentLabels.positives = [];
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

    $.each(currentLabels.addedCategories, function(i, val) {
      currentLabels.positives.push(val);
    });


    var data = {
      "positives": currentLabels.positives.slice(),
    }
    $.each(data.positives, function(i, val) {
      data.positives[i] = val;
    });
    workerAnswers[currentImg] = data;
  } 
});