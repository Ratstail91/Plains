import React from 'react';
import { connect } from 'react-redux';

import { SCREEN_LANDING, SCREEN_MAP, SCREEN_PROFILE } from './actions.jsx';

import ScreenLanding from './screen_landing.jsx';
import ScreenMap from './screen_map.jsx';
import ScreenProfile from './screen_profile.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    switch(this.props.screen) {
      default:
      case SCREEN_LANDING:
        return <ScreenLanding />;
      case SCREEN_MAP:
        return <ScreenMap />;
      case SCREEN_PROFILE:
        return <ScreenProfile />;
    };
  }
};

App.contextTypes = {
  store: React.PropTypes.object
};

function mapStateToProps(store) {
  return {
    screen: store.screen
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
