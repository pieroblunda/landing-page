// Load data
const fn = function(){
  // Parse URL
  const data = JSON.parse(document.querySelector('code').textContent);

  // Title
  moment.locale();
  document.querySelector('#title').innerText = data.name;
  document.querySelector('#date').innerText = moment(data.date).format('LL');
  document.querySelector('#placeName').innerText = data.place;
  document.querySelector('#address').innerText = data.address;
  document.querySelector('#dressCode').innerText = data.dressCode;
  document.querySelector('#cbu').innerText = data.cbu;
  document.querySelector('#googleMapsButton').setAttribute("href", data.googleMapsLink);
  document.querySelector('#imgPathChurh').setAttribute("src", data.imgPathChurh);
  document.querySelector('#imgPathGift').setAttribute("src", data.imgPathGift);
  document.querySelector('#imgPathParty').setAttribute("src", data.imgPathParty);
  window.setCountdown(new Date(data.date));

}

document.addEventListener('DOMContentLoaded', fn, false);
