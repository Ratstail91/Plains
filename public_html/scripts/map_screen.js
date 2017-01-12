var map;
var questList = {};

function fetchQuests(pos) {
  //fetch quests
  var request = new XMLHttpRequest();

  //callback
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      //read the JSON data
      jsonData = JSON.parse(request.responseText);

      //Draw the markers to the map
      for (var key in jsonData) {
        //prevent overflow
        if (typeof questList[key] != 'undefined') {
          continue;
        }
        questList[key] = true;

        //create the quest marker
        var latLng = new google.maps.LatLng(jsonData[key].latitude, jsonData[key].longitude);
        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: "quest" //TODO: custom names
        });
      }
    }
  }

  //setup the variables
  //TODO: variable radius
  var formData = new FormData();
  formData.append("latitude", pos.lat);
  formData.append("longitude", pos.lng);
  formData.append("radius", 1000);

  //send the initialization command
  request.open('POST', 'fetch_quests.cgi');
  request.send(formData);
}

function initializePosition(position) {
  //setup the map's initial state
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: position.coords.latitude, lng: position.coords.longitude},
    zoom: 18
  });

  //initialize the surrounding area with quests
  var request = new XMLHttpRequest();

  //callback
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
//  map.setZoom(18);

  //Check for nearby quests
//  fetchQuests(pos);

  //debugging
  document.getElementById('message').innerHTML = "<p>Latitude: " + pos.lat + ", Longitude: " + pos.lng + "</p>";
}

function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(initializePosition);
    navigator.geolocation.watchPosition(jumpToPosition, function() {}, {enableHighAccuracy: 1});
  }
  else {
    //error message
    document.getElementById('message').innerHTML = "<p>Geolocation is not supported by this browser.</p>";
  }
}

