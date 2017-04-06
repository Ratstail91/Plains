import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { SCREEN_LANDING, setScreen } from './actions.jsx';

class ScreenSignup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="textCentered" style={this.props.style}>
        <p>Email verification sent!</p>
        <p>Check your spam folder!</p>
        <Button type="submit" onClick={() => this.props.setScreen(SCREEN_LANDING)}>Go Back</Button>
      </div>
    );
  }
};

ScreenSignup.contextTypes = {
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

ScreenSignup = connect(mapStateToProps, mapDispatchToProps)(ScreenSignup);

export default ScreenSignup;
