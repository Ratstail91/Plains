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
      top: "2px",
      left: "2px",
      right: "2px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      zIndex: "999"
    };

    return (
      <div style={buttonContainerStyle}>

        <Button
          color="violet"
          onClick={this.props.leftClick}
        >{this.props.leftText}</Button>

        <Button
          color="violet"
          onClick={this.props.rightClick}
        >{this.props.rightText}</Button>

      </div>
    );
  }
};

export default HeaderButtons;
