import React from 'react';

class FooterPanel extends React.Component {
  render() {
    let style = {
      fontStyle: "italic"
    };

    return ( 
      <footer>
        <p className="textSmall textCentered" style={style}>Copyright KR Game Studios 2017</p>
      </footer>
    );
  }
}

export default FooterPanel;
