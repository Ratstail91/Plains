import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

class FooterButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //TODO: proper button array class
    //TODO: proper left-middle-right settings
    let buttonContainerStyle = {
      position: "fixed",
      left: "2px",
      right: "2px",
      bottom: "40px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      zIndex: "999"
    };

    return (
      <div style={buttonContainerStyle}>

        <Button
          color="violet"
          onClick={this.props.middleClick}
        >{this.props.middleText}</Button>

      </div>
    );
  }
};

export default FooterButtons;
