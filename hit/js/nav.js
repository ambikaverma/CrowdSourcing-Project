$(document).ready(function() {
  $("#prev").click(function() {
    if (currentImg != 0) {
      currentImg -= 1;
      $("img").attr("src", "images/" + imgs[currentImg] + ".jpg");
    }
  });

  $("#next").click(function() {
    if (currentImg == imgs.length - 1) {
      alert("done");
      return;
    }

    currentImg += 1;
    $("img").attr("src", "images/" + imgs[currentImg] + ".jpg");
  });

  $("#issue").click(function() {
    alert("issue reported")

    currentImg += 1;
    $("img").attr("src", "images/" + imgs[currentImg] + ".jpg");
  });
});