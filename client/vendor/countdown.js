window.setCountdown = function getDowntime(dateEvent){

  // Find the distance between now and the count down date
  var now = new Date().getTime();
  var distance = dateEvent - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="countdown-container"
  document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is over, write some text
  if (distance < 0) {
    document.getElementById('countdown').innerHTML = "EXPIRED";
  }

  var intervalInstance = setInterval(function() {
    window.setCountdown(dateEvent);
    clearInterval(intervalInstance);
  }, 1000);
}
