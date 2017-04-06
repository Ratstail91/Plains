import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import GoogleMap from './google_map.jsx';

import { clearStore, SCREEN_LANDING, SCREEN_PROFILE, setScreen } from './actions.jsx';

class ScreenMap extends React.Component {
  constructor(props) {
    super(props);
  }

  syncMap() {
    this._mapRef.setCenter({
      lat: this._lat,
      lng: this._lng
    });
  }

  initPosition(position) {
    this._lat = position.coords.latitude;
    this._lng = position.coords.longitude;
    this.syncMap();
  }

  updatePosition(position) {
    this._lat = position.coords.latitude;
    this._lng = position.coords.longitude;
    this.syncMap();
  }

  watchPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.initPosition.bind(this));
      navigator.geolocation.watchPosition(this.updatePosition.bind(this), ()=>{}, {enableHighAccuracy:1});
    }
    else {
      alert("Please enable GPS and reload the page");
    }
  }

  loadMarkers() {
    //TODO: loadMarkers
  }

  logout() {
    this.props.clearStore();
    this.props.setScreen(SCREEN_LANDING);
  }

  componentDidMount() {
    this.watchPosition();
    this.loadMarkers();
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
