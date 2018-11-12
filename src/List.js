import React, { Component } from 'react';
import Geocode from 'react-geocode';
import escapeRegExp from 'escape-string-regexp';

Geocode.setApiKey('AIzaSyC21SntdNn1vCb5VOAujCPIM7a9p5XkvRs');

class List extends Component {
  state = {
    FoodSpots: [],
    query: ''
  }

  componentDidMount() {
    Geocode.fromAddress("Times Square").then(
      geoResponse => {
        const { lat, lng } = geoResponse.results[0].geometry.location;
        this.props.clientIdAndSecret.venues.getVenues({
          'll': `${lat},${lng}`,
          'categoryId': '4d4b7105d754a06374d81259'
        }).then(Response => {
          const venues = Response.response.venues;
          this.props.setMarkers(venues);
          this.setState({ FoodSpots: venues });
        });
      }
    );
  }

  updateQuery = (query) => {
    this.setState({ query }, () => {
      const markers = this.getFilteredFoodSpots();
      this.props.setMarkers(markers);
    });
  }

  getFilteredFoodSpots() {
    const { query, FoodSpots } = this.state;

    if (!query) {
      return FoodSpots;
    }

    const placeList = new RegExp(escapeRegExp(query), 'i');
    return FoodSpots.filter(point => FoodSpots.test(point.name));
  }

  getInputField = () => {
    const { query } = this.state;

    return <input
      tabIndex={1}
      className='filter-FoodSpots'
      type='text'
      value={query}
      onChange={event => this.updateQuery(event.target.value)}
      placeholder='Search FoodSpots' />
  }

  findPlaces = () => {
    let filteredFoodSpots = this.getFilteredFoodSpots();

    return (
      <ol className='FoodSpots'>
        {filteredFoodSpots.map((p, index) =>
          <li
            tabIndex={index + 2}
            key={index}
            className='place'
            onClick={() => {this.props.onPlaceClick(index)}}
            onKeyUp={event => {
              if (event.keyCode === 13) {
                this.props.onPlaceClick(index);
              }
            }}>
              {p.name}
          </li>
        )}
      </ol>
    )
  }

  render() {
    return (
      <div>
        <div className='sidebar'>
          <div className='heading'>
            <h1 className='title'>
              FoodSpots
            </h1>
            {this.getInputField()}
          </div>
          <div className='place-list'>
            {this.findPlaces()}
          </div>
        </div>
      </div>
    );
  }
}

export default List;
