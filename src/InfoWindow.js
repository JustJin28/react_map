import React, { Component } from 'react';

class InfoWindow extends Component {
  render() {
    const { place } = this.props;

    return (
      <article className='info-window' tabIndex='1'>
        <h2 className='info-name'>{place.name}</h2>
        <p
          onClick={() => {this.props.hideInfoWindow()}}
          className='close-window'>X</p>
        <p className='info-category'>{place.categories[0].name}</p>
        <p className='info-address'>{place.location.address}, {place.location.city}</p>
        {place.bestPhoto && (
          <img
          alt={place.name}
          src={`${place.bestPhoto.prefix}250x150${place.bestPhoto.suffix}`}></img>
          )}
        <p className='attribution'>
          Data provided by <a target='_blank' href='https://foursquare.com'>Foursquare</a>
        </p>
      </article>
    )
  }
}

export default InfoWindow;
