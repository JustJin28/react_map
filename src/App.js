import React, { Component } from 'react';
import List from './List';
import Map from './Map';
import InfoWindow from './InfoWindow';
import './App.css';

const clientIdAndSecret = require('react-foursquare')({
  clientID: 'RLSFCLSBK2V1BODGCUSP25UOL4VNDY3ZD0MW3FS0OR5035BB',
  clientSecret: 'X23KNYTJ3IMWT1XQCWNNSZQ2AZZGLZ1ZKYEIOX4G5ZHA1PRD'
});

class App extends Component {
  state = {
    venues: [],
    currentTarget: null
  }

  summonMarkers = (venues) => {
    this.setState({ venues });
  }

  wasMarkerClicked = (marker) => {
    const venues = this.state.venues.map((point, target) => {
      if (target === marker) {
        point.clicked = true;
      } else {
        point.clicked = false;
      }
      return point;
    });
    this.getInfo(this.state.venues[marker])
      .then(Response => {
        this.setState({
          venues: venues,
          currentTarget: Response.response.venue
        });
        document.querySelector('.info-window').focus();
      })
  }

  hideInfoWindow = () => {
    const venues = this.state.venues.map((point, target) => {
      point.clicked = false;
      return point;
    });
    this.setState({ venues: venues, currentTarget: null });
  }

  getInfo = (place) => {
    return clientIdAndSecret.venues.getVenue({
      'venue_id': place.id
    })
  }

  render() {
    const venuesInfo = this.state.venues.map(venu => {
      return { lat: venu.location.lat, lng: venu.location.lng, clicked: venu.clicked }
    });

    return (
      <div className='app-container'>
        <List
          clientIdAndSecret={clientIdAndSecret}
          setMarkers={this.summonMarkers}
          onPlaceClick={this.wasMarkerClicked} />
        <Map
          venues={venuesInfo}
          hideInfoWindow={this.hideInfoWindow}
          onMarkerClick={this.wasMarkerClicked}
           />
        {this.state.currentTarget && (<InfoWindow
          place={this.state.currentTarget}
          clientIdAndSecret={clientIdAndSecret}
          hideInfoWindow={this.hideInfoWindow} />)}
      </div>
    );
  }
}

export default App;
