var map;

function fetchQuests(position) {
  //TODO: fetch quests
//  var text = "Fetching Quests (" + position.lat + ", " + position.lng + ")";
//  alert(text);
}

function initializePosition(position) {
  //initialize the surrounding area with quests
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var hash = JSON.parse(request.responseText);
      fetchQuests({
        lat: hash.latitude,
        lng: hash.longitude
      });
    }
  }

  //setup the variables
  var formData = new FormData();
  formData.append("latitude", position.coords.latitude);
  formData.append("longitude", position.coords.longitude);

  //send the initialization command
  request.open('POST', 'initialize.cgi');
  request.send(formData);
}

function jumpToPosition(position) {
  var pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  }

  map.setCenter(pos);
  map.setZoom(18);

  //Check for nearby quests
  fetchQuests(pos);

  //debugging
  document.getElementById('debug').innerHTML = "<p>Latitude: " + pos.lat + ", Longitude: " + pos.lng + "</p>";
}

function initMap() {
  if (navigator.geolocation) {
    //setup the map's initial state
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 0, lng: 0}, //null island
      zoom: 6
    });

    navigator.geolocation.getCurrentPosition(initializePosition);
    navigator.geolocation.watchPosition(jumpToPosition, function() {}, {enableHighAccuracy: 1});
  }
  else {
    //error message
    document.getElementById('debug').innerHTML = "<p>Geolocation is not supported by this browser.</p>";
  }
}

