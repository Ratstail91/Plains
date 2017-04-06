import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import GoogleMap from './google_map.jsx';

import { SCREEN_PROFILE, setScreen } from './actions.jsx';

class ScreenMap extends React.Component {
  constructor(props) {
    super(props);
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
          <Button style={buttonStyle} color="violet" floated="left">Logout</Button>
          <Button style={buttonStyle} color="violet" floated="right">Profile</Button>
        </div>
        <GoogleMap style={{height:"calc(100vh - 24px)"}} />
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
    setScreen: (screen) => { dispatch(setScreen(screen)); }
  };
}

ScreenMap = connect(mapStateToProps, mapDispatchToProps)(ScreenMap);

export default ScreenMap;
