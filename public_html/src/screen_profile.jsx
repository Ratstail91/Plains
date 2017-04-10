import React from 'react';
import { connect } from 'react-redux';

import HeaderButtons from './header_buttons.jsx';

import { SCREEN_LANDING, SCREEN_MAP, setScreen } from './actions.jsx';

class ScreenProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  //utility functions
  logout() {
    this.props.clearStore();
    this.props.setScreen(SCREEN_LANDING);
  }

  render() {
    let currencyContainerStyle = {
      position: "fixed",
      top: "40px",
      left: "2px",
      right: "2px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    };

    return (
      <div style={this.props.style}>
        <HeaderButtons

          leftText="Logout"
          leftClick={this.logout.bind(this)}

          rightText="Map"
          rightClick={()=>{this.props.setScreen(SCREEN_MAP);}}

        />
        <div style={currencyContainerStyle}>
          <p>Coins: {this.props.coins}</p>
          <p>Jewels: {this.props.jewels}</p>
        </div>
      </div>
    );
  }
};

ScreenProfile.contextTypes = {
  store: React.PropTypes.object
};

function mapStateToProps(store) {
  return {
    screen: store.screen,
    coins: store.coins,
    jewels: store.jewels
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setScreen: (screen) => { dispatch(setScreen(screen)); },
    clearStore: () => { dispatch(clearStore()); }
  };
}

ScreenProfile = connect(mapStateToProps, mapDispatchToProps)(ScreenProfile);

export default ScreenProfile;
