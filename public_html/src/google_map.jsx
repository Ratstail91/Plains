import React from 'react';
import ReactDOM from 'react-dom';

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
  }

  loadMap() {
    let options = this.props.options || {
      center: {lat: 0, lng: 0},
      zoom: 8
    };

    let node = ReactDOM.findDOMNode(this._nodeRef);

    this._mapRef = new google.maps.Map(node, options);
  }

  componentDidMount() {
    this.loadMap();
  }

  render() {
    let style = {
      height: "100vh",
      position: "relative"
    };

    Object.assign(style, this.props.style);

    return (
      <div style={style} ref={(i) => { this._nodeRef = i; }}></div>
    );
  }
}

export default GoogleMap;
