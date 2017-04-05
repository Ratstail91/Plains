import React from 'react';
import { connect } from 'react-redux';

import { SCREEN_LANDING, SCREEN_MAP, SCREEN_PROFILE } from './actions.jsx';

import ScreenLanding from './screen_landing.jsx';
import ScreenMap from './screen_map.jsx';
import ScreenProfile from './screen_profile.jsx';

import FooterPanel from './footer_panel.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let flexStyle = {
      display: "flex",
      minHeight: "100vh",
      flexDirection: "column"
    };

    let style = {
      flex: "1"
    };

    let screen;

    switch(this.props.screen) {
      default:
      case SCREEN_LANDING:
        screen = <ScreenLanding style={style} />;
        break;

      case SCREEN_MAP:
        screen = <ScreenMap style={style} />;
        break;

      case SCREEN_PROFILE:
        screen = <ScreenProfile style={style} />;
        break;
    };

    return (
      <div style={flexStyle}>
        {screen}
        <FooterPanel />
      </div>
    );
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
