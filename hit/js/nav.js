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

  function checkAnswers() {
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
      alert("done");
      return;
    }

    current += 1;
    prepImg();
  }

  function saveLabels() {
    $.each(currentLabels.addedCategories, function(i, val) {
      var response = $("input:radio[name=" + val + "]:checked").val();
      if (response == "yes")
        currentLabels.positives.push(val);
      else
        currentLabels.negatives.push(val);
    });

    currentLabels.confidence = $("#confidenceRange").val();
  } 
});