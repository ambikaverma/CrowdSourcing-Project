$(document).ready(function() {
  $("#prev").click(function() {
    if (current != 0) {
      current -= 1;
      currentImg = imgs[current];
      prepImg();
    }
  });

  $("#next").click(function() {
    if (current == imgs.length - 1) {
      alert("done");
      return;
    }

    current += 1;
    currentImg = imgs[current];
    prepImg();
  });

  $("#issue").click(function() {
    alert("issue reported")

    current += 1;
    currentImg = imgs[current];
    prepImg();
  });
});