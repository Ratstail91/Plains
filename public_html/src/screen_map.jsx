import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

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

  //react component methods
  componentDidMount() {
    this.watchPosition();
  }

  render() {
    let buttonContainerStyle = {
      position: "fixed",
      width: "calc(100vw - 4px)",
      top: "2px",
      left: "2px",
      zIndex: "999"
    };

    let buttonStyle = {
      position: "relative"
    };

    return (
      <div style={this.props.style}>
        <div style={buttonContainerStyle}>

          <Button
            style={buttonStyle}
            color="violet"
            floated="left"
            onClick={() => { this.logout(); }}
          >Logout</Button>

          <Button
            style={buttonStyle}
            color="violet"
            floated="right"
            onClick={() => { this.props.setScreen(SCREEN_PROFILE); }}
          >Profile</Button>

        </div>
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
