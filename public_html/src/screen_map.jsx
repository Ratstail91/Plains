import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { SCREEN_LANDING, SCREEN_MAP, SCREEN_PROFILE, setScreen } from './actions.jsx';

class ScreenMap extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={this.props.style}>
        <p>Screen Map</p>
        <Button type="submit" onClick={() => this.props.setScreen(SCREEN_LANDING)}>Screen Landing</Button>
        <Button type="submit" onClick={() => this.props.setScreen(SCREEN_MAP)} disabled={true}>Screen Map</Button>
        <Button type="submit" onClick={() => this.props.setScreen(SCREEN_PROFILE)}>Screen Profile</Button>
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
