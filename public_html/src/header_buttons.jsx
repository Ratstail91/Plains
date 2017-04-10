import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

class HeaderButtons extends React.Component {
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
      <div style={buttonContainerStyle}>

        <Button
          style={buttonStyle}
          color="violet"
          floated="left"
          onClick={this.props.leftClick}
        >{this.props.leftText}</Button>

        <Button
          style={buttonStyle}
          color="violet"
          floated="right"
          onClick={this.props.rightClick}
        >{this.props.rightText}</Button>

      </div>
    );
  }
};

export default HeaderButtons;
