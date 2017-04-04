import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';

import { SCREEN_MAP, setScreen } from './actions.jsx';

const OPEN_LOGIN = 'OPEN_LOGIN';
const OPEN_SIGNUP = 'OPEN_SIGNUP';

class ScreenLanding extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: OPEN_LOGIN
    };
  }

  clearFields() {
    this.setState({
      email: '',
      password: '',
      retypePassword: ''
    });
  };

  loginClick() {
    if (this.state.open !== OPEN_LOGIN) {
      this.setState({open: OPEN_LOGIN});
      return;
    }

    //TODO: login logic
  };

  signupClick() {
    if (this.state.open !== OPEN_SIGNUP) {
      this.setState({open: OPEN_SIGNUP});
      return;
    }

    //TODO: signup logic
  };

  updateEmail(evt) {
    this.setState({email: evt.target.value});
  }

  updatePassword(evt) {
    //TODO: security
    this.setState({password: evt.target.value});
  }

  updateRetypePassword(evt) {
    //TODO: security
    this.setState({retypePassword: evt.target.value});
  }

  componentWillMount() {
    this.clearFields();
  }

  render() {
    let form;

    //determine which form to display
    switch(this.state.open) {
      case OPEN_LOGIN:
        form =
          <Form>
            <Form.Input label='Email' placeholder='your@email.com' value={this.state.email} onChange={this.updateEmail.bind(this)} />
            <Form.Input label='Password' placeholder='disabled' value={this.state.password} onChange={this.updatePassword.bind(this)} disabled={true} />
          </Form>;
      break;
      case OPEN_SIGNUP:
        form =
          <Form>
            <Form.Input label='Email' placeholder='your@email.com' value={this.state.email} onChange={this.updateEmail.bind(this)} />
            <Form.Input label='New Password' placeholder='disabled' value={this.state.password} onChange={this.updatePassword.bind(this)} disabled={true} />
            <Form.Input label='Retype Password' placeholder='disabled' value={this.state.retypePassword} onChange={this.updateRetypePassword.bind(this)} disabled={true} />
          </Form>;
      break;
    };

    //render the full page
    return (
      <div>
        <p className="textLarge textCenter">Welcome to Plains!</p>
        {form}
        <div className="textCentered" stlye={{display: "inline"}}>
          <Button onClick={this.loginClick.bind(this)}>Log In</Button>
          <Button onClick={this.signupClick.bind(this)}>Sign Up</Button>
        </div>
        <p>This website is currently under construction. Please forgive any bugs, features and bugs pretending to be features. This game is best played in a phone browser.</p>
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
