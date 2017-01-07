var map;

function jumpToPosition(position) {
  var pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  }

  map.setCenter(pos);
  map.setZoom(18);

  //TODO: initialize surrounding area with quests

  //debugging
  document.getElementById('debug').innerHTML = "<p>Latitude: " + pos.lat + ", Longitude: " + pos.lng + "</p>";
}

function initMap() {
  if (navigator.geolocation) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 0, lng: 0}, //null island
      zoom: 6
    });

    navigator.geolocation.watchPosition(jumpToPosition, function() {}, {enableHighAccuracy: 1});
  }
  else {
    //error message
    document.getElementById('debug').innerHTML = "<p>Geolocation is not supported by this browser.</p>";
  }
}

