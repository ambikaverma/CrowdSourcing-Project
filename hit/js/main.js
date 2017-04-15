var imgs = [];
var currentImg = 0;

(function(key) {
  var regexS = "[\\?&]" + key + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var tmpURL = window.location.href;
  var results = regex.exec(tmpURL);
  if(results != null) {
    imgs = results[1].split(",");
    console.log(imgs)
    console.log(imgs[0])
    $("img").attr("src", "images/" + imgs[currentImg] + ".jpg");
  }
})("imgs");