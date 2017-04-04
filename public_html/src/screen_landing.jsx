import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { SCREEN_LANDING, SCREEN_MAP, SCREEN_PROFILE, setScreen } from './actions.jsx';

class ScreenLanding extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>Screen Landing</p>
        <Button type="submit" onClick={() => this.props.setScreen(SCREEN_LANDING)} disabled={true}>Screen Landing</Button>
        <Button type="submit" onClick={() => this.props.setScreen(SCREEN_MAP)}>Screen Map</Button>
        <Button type="submit" onClick={() => this.props.setScreen(SCREEN_PROFILE)}>Screen Profile</Button>
      </div>
    );
  }
};

ScreenLanding.contextTypes = {
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

ScreenLanding = connect(mapStateToProps, mapDispatchToProps)(ScreenLanding);

export default ScreenLanding;
