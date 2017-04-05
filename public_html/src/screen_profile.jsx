import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { SCREEN_LANDING, SCREEN_MAP, SCREEN_PROFILE, SCREEN_SIGNUP, setScreen } from './actions.jsx';

class ScreenProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={this.props.style}>
        <p>Screen Profile</p>
        <Button type="submit" onClick={() => this.props.setScreen(SCREEN_LANDING)}>Screen Landing</Button>
        <Button type="submit" onClick={() => this.props.setScreen(SCREEN_MAP)}>Screen Map</Button>
        <Button type="submit" onClick={() => this.props.setScreen(SCREEN_PROFILE)} disabled={true}>Screen Profile</Button>
        <Button type="submit" onClick={() => this.props.setScreen(SCREEN_SIGNUP)}>Screen Signup</Button>
      </div>
    );
  }
};

ScreenProfile.contextTypes = {
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

ScreenProfile = connect(mapStateToProps, mapDispatchToProps)(ScreenProfile);

export default ScreenProfile;
