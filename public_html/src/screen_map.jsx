import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import HeaderButtons from './header_buttons.jsx';
import FooterButtons from './footer_buttons.jsx';
import GoogleMap from './google_map.jsx';

import { clearStore, SCREEN_LANDING, SCREEN_PROFILE, setScreen } from './actions.jsx';

class ScreenMap extends React.Component {
  constructor(props) {
    super(props);

    this._questMarkers = [];
  }

  //utility functions
  logout() {
    this.props.clearStore();
    this.props.setScreen(SCREEN_LANDING);
  }

  syncMap() {
    this._mapRef.setCenter({
      lat: this._lat,
      lng: this._lng
    });
  }

  getPosition(position) {
    this._lat = position.coords.latitude;
    this._lng = position.coords.longitude;
  }

  //get and watch the current position
  watchPosition() {
    if (navigator.geolocation) {
      navigator
        .geolocation
        .watchPosition(
          (p)=>{
            this.getPosition(p);
            this.syncMap();
            this.loadMarkers();
          },
          ()=>{},
          {enableHighAccuracy:1}
        );
    }
    else {
      alert("Please enable GPS and reload the page");
    }
  }

  //load from the server
  loadMarkers() {
  //BUG: #1 This function is often called multiple times before a response can get back to the client. As a result, too many markers are created on the initial load.

    //check the number of loaded markers
    if (this._questMarkers.length >= 10) { //TODO: magic number
      return;
    }

    //create the arguments
    let formData = new FormData();
    formData.append("latitude", this._lat);
    formData.append("longitude", this._lng);
    formData.append("radius", 1000);

    //create the request
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status !== 200) {
        console.log('Error:', xhr.status);
      }

      //add the markers to the map
      let markers = JSON.parse(xhr.responseText);

      for (let key in markers) {
        //prevent duplicates
        if (typeof this._questMarkers[key]!=='undefined') {
          continue;
        }

        //make and store the marker
        let latLng = new google.maps.LatLng(
          markers[key].latitude,
          markers[key].longitude
        );

        this._questMarkers[key] = new google.maps.Marker({
          position: latLng,
          map: this._mapRef,
          title: "quest"
        });
      }
    };
    xhr.open('POST', '/serv/fetch_quest_markers.cgi');
    xhr.send(formData);
  }

  //use the server's API to determine distances to markers
  fetchDistances(onSuccess) {
    //convert the markers into a usable format
    let posList = [];
    for (let key in this._questMarkers) {
      posList.push({
        id: key,
        lat: this._questMarkers[key].getPosition().lat(),
        lng: this._questMarkers[key].getPosition().lng()
      });
    }

    //skip an empty set
    if (posList.length === 0) {
      return -1;
    }

    //the payload proper
    let payload = {
      origin: {lat: this._lat, lng: this._lng},
      destinations: posList
    };

    //build the argument
    let formData = new FormData();
    formData.append('payload', JSON.stringify(payload));

    //build the xhr
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status !== 200) {
        console.log("Error:",xhr.status);
      }

      onSuccess(xhr.responseText);
    };

    //send the message
    xhr.open('POST', '/serv/distances.cgi');
    xhr.send(formData);
  };

  search() {
    this.fetchDistances(function(responseText) {
      let response = JSON.parse(responseText);

      let nearest;
      let nearestValue = 99999999;

      for (let key in response) {
        if (response[key] < nearestValue) {
          nearest = key;
          nearestValue = response[key];
        }
        //debugging
        this._questMarkers[key].setLabel('');
      }
      //debugging
      this._questMarkers[nearest].setLabel('X');

      //collect the marker if you're close enough
      if (nearestValue <= 3000) { //active searching
        this.collectMarker(nearest);
      }
    }.bind(this));
  }

  collectMarker(id) { //TODO: plural?
    let formData = new FormData();
    formData.append("id", id);
    formData.append("latitude", this._lat);
    formData.append("longitude", this._lng);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status !== 200) {
        console.log("Error:",xhr.status);
      }

      if (xhr.responseText !== 'success') {
        console.log("Error:",xhr.responseText);
      }

      //delete the local marker
      this._questMarkers[id].setMap(null);
      this._questMarkers.splice(id, 1);
    }.bind(this);

    xhr.open('POST', '/serv/collect_quest_marker.cgi');
    xhr.send(formData);
  }

  //react component methods
  componentDidMount() {
    this.watchPosition();
  }

  render() {
    return (
      <div style={this.props.style}>
        <HeaderButtons

          leftText="Logout"
          leftClick={this.logout.bind(this)}

          rightText="Profile"
          rightClick={()=>{this.props.setScreen(SCREEN_PROFILE);}}

        />

        <FooterButtons
          middleText="Search"
          middleClick={this.search.bind(this)}
        />

        <GoogleMap style={{height:"calc(100vh - 24px)"}} setMapRef={(i) => { this._mapRef = i; }} />
      </div>
    );
  }
};

ScreenMap.contextTypes = {
  store: React.PropTypes.object
};

function mapStateToProps(store) {
  return {
    screen: store.screen
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setScreen: (screen) => { dispatch(setScreen(screen)); },
    clearStore: () => { dispatch(clearStore()); }
  };
}

ScreenMap = connect(mapStateToProps, mapDispatchToProps)(ScreenMap);

export default ScreenMap;
