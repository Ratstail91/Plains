var apiKey = 'AIzaSyBxfC74w9f09Ts4a1IjGggxotTnTXVsFls';
var map;
var questList = {};
var distanceToNearest = '???';

//fetch all nearby quests from the server
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
        //prevent overwriting
        if (typeof questList[key] != 'undefined') {
          continue;
        }

        //create the quest marker
        var latLng = new google.maps.LatLng(jsonData[key].latitude, jsonData[key].longitude);
        questList[key] = new google.maps.Marker({
          position: latLng,
          map: map,
          title: "quest" //TODO: custom names
        });
      }
    }
  }

  //setup the variables
  var formData = new FormData();
  formData.append("latitude", pos.lat);
  formData.append("longitude", pos.lng);
  formData.append("radius", 1000);

  //send the initialization command
  request.open('POST', 'fetch_quests.cgi');
  request.send(formData);
}

//collect quest markers
function calcDistances(pos) {
  //build the request, made up of questList's position objects
  var posList = [];
  for (var key in questList) {
    posList.push({
      id: key,
      lat: questList[key].getPosition().lat(),
      lng: questList[key].getPosition().lng()
    });
  }

  //empty list
  if (posList.length == 0) {
    return -1;
  }

  //the payload proper
  var payload = {
    origin: pos,
    destinations: posList
  };

  //create the request object
  var request = new XMLHttpRequest();

  //callback
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      var response = JSON.parse(request.responseText);

      //get the nearest marker
      var nearest;
      var nearestValue = 99999999;

      for (var key in response) {
        if (response[key] < nearestValue) {
          nearest = key;
          nearestValue = response[key];
        }
        //debugging
        questList[key].setLabel('');
      }

      if (nearestValue <= 30) {
        questList[nearest].setLabel('X');
      }
      //debugging
      distanceToNearest = nearestValue;
    }
  };

  //create the form data
  var formData = new FormData();
  formData.append('payload', JSON.stringify(payload));

  //send the calculation command
  request.open('POST', 'distances.cgi');
  request.send(formData);
}

//called once
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

//called repeatedly
function jumpToPosition(position) {
  var pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  }

  map.setCenter(pos);

  //debugging
  document.getElementById('message').innerHTML = "<p>Latitude: " + pos.lat + ", Longitude: " + pos.lng + "</p>" + "<p>Distance to Nearest: " + distanceToNearest + "</p>";
}

//called on demand
function scanPosition(position) {
  //called using navigator.geolocation.getCurrentPosition(scanPosition)
  var pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  }
  fetchQuests(pos);
  calcDistances(pos);
}

//this function is passed to the API itself
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

