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
    $("input[type=radio]").remove();

    $("<input />")
      .attr("type", "hidden")
      .attr("name", "labels")
      .attr("value", JSON.stringify(workerAnswers))
      .appendTo("#mturk_form");
  });

  function checkAnswers() {
    var verified = $($("input[name='verify']:checked")[0]).val();

    if (!verified) {
      alert("Please make sure you've answered each question.");
      return false;
    }

    return true;
  }

  function nextImg(ok, error) {
    if (!ok)
      return;

    if (error) {
      workerAnswers[currentImg] = "error";
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
    currentLabels = $($("input[name='verify']:checked")[0]).val();
    workerLabels[currentImg] = currentLabels;
    workerAnswers[currentImg] = currentLabels;
  }
});
