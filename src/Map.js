import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

function onMapLoaded() {
  window.isMapLoaded = true;
}

const MapComponent = withScriptjs(withGoogleMap(props => {
    return <GoogleMap
      defaultZoom={12}
      defaultCenter={props.venues.length > 0 ? props.venues[0] : {lat: 40.7589, lng: -73.9851}}
      defaultOptions={{mapTypeControl: false}}
      onClick={props.hideInfoWindow}
      >
      {props.isMarkerShown && (props.venues.map((place, index) =>
        <Marker
          key={index}
          position={place}
          onClick={() => {props.onMarkerClick(index)}} /> ))
      }
    </GoogleMap>
  }
))

class Map extends Component {
  didComponentMount() {
    window.isMapLoaded = false;
    window.onMapLoaded = onMapLoaded;
  }

  render() {
    return <div
      className='map-container'
      style={{marginLeft: '250px'}}>
      <MapComponent
        isMarkerShown={this.props.venues.length > 0}
        googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyC21SntdNn1vCb5VOAujCPIM7a9p5XkvRs&v=3.exp&libraries=geometry,drawing,venues&callback=onMapLoaded'
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        venues={this.props.venues}
        hideInfoWindow={this.props.hideInfoWindow}
        onMarkerClick={this.props.onMarkerClick}
      />
    </div>;
  }
}

export default Map;
