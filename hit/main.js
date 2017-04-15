(function(key) {
  var regexS = "[\\?&]" + key + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var tmpURL = window.location.href;
  var results = regex.exec(tmpURL);
  if(results != null) {
    document.getElementById(key).src = "images/" + results[1] + ".jpg";}
})("img");