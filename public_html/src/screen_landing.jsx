import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';

import { SCREEN_MAP, setScreen, setDetails } from './actions.jsx';

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

    //login logic
    let formData = new FormData();
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status !== 200) {
        console.log('Error:', xhr.status);
      }

      //check for errors
      function strcmp(a, b) { return (a<b)?-1:((a>b)?1:0); };
      if (!strcmp(xhr.responseText, "failure -1")) {
        alert("Invalid email");
        return;
      }
      if (!strcmp(xhr.responseText, "failure -2")) {
        alert("Username or password incorrect");
        return;
      }
      if (!strcmp(xhr.responseText, "failure -3")) {
        alert("Duplicate account entries found");
        return;
      }

      //store login details, switch to new screen
      let resp = JSON.parse(xhr.responseText);
      this.props.setDetails(resp[0], resp[1], resp[2]);
      this.props.setScreen(SCREEN_MAP);
    }.bind(this);
    xhr.open('POST', '/serv/login.cgi');
    xhr.send(formData);
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
      <div style={this.props.style}>
        <p className="textLarge textCentered">Welcome to Plains!</p>
        {form}
        <div className="textCentered">
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
    setScreen: (screen) => { dispatch(setScreen(screen)); },
    setDetails: (email, coins, jewels) => { dispatch(setDetails(email, coins, jewels)); }
  };
}

ScreenLanding = connect(mapStateToProps, mapDispatchToProps)(ScreenLanding);

export default ScreenLanding;
