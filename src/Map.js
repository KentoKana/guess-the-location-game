import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import Streetview from './Streetview';
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: [
        {
          position: {},
        },
      ],
      disableButton: true,
      btnClassName: 'disabled',
    };
    this.numberOfGuesses = 0;
  }

  //Function to calculate distance between two latitude and longitude points.
  //https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
  getDistanceFromLatLonInKm = () => {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(this.state.currentPosition[0].position.lat - this.props.coord.lat);  // deg2rad below
    var dLon = this.deg2rad(this.state.currentPosition[0].position.lng - this.props.coord.lng);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(this.props.coord.lat)) * Math.cos(this.deg2rad(this.state.currentPosition[0].position.lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    this.props.getDistanceAwayFromTarget(d);
    this.numberOfGuesses += 1;
    this.props.getNumberOfGuessesMade(this.numberOfGuesses);
    return d;
  }
  //Convert degree to radians.
  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  //Handle marker on click.
  //https://stackoverflow.com/questions/51421714/how-to-add-marker-onclick-and-show-my-geolocation-in-google-maps-react
  onClick = (t, map, coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState(prevState => {
      return {
        currentPosition: [
          {
            position: { lat, lng }
          },
        ],
        disableButton: false,
        btnClassName: ''
      };
    });

    this.coordToAimFor = {
      lat: this.props.coord.lat,
      lng: this.props.coord.lng,
    }
  }

  //Bind keypress when component is mounted.
  componentDidMount() {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 32 && this.state.btnClassName !== 'disabled') {
        //disable keypress once user has guessed the correct location.
        if (this.getDistanceFromLatLonInKm() < 50) {
          this.setState({
            btnClassName: 'disabled'
          });
        }
      }
    })
  }

  render() {
    const mapContainerSize = {
      width: '30%',
      height: '250px',
      zIndex: '999',
    }

    if (this.props.coord.lat === '' || this.props.coord.lng === '') {
      return (
        <div>
          Loading...
        </div>
      )
    } else {
      return (
        <>
          <div className="map__container">
            <div>
              <Map
                google={this.props.google}
                style={mapContainerSize}
                zoom={1}
                onClick={this.onClick}
                className="map-opacity"
                clickableIcons={false}
              >
                {this.state.currentPosition.map((marker, index) => (
                  <Marker
                    key={index}
                    position={marker.position}
                  />
                ))}
              </Map>

            </div>
            <Streetview
              apiKey={googleMapsApiKey}
              coord={this.props.coord}
            />
            <button
              id="submitGuess"
              onClick={
                this.getDistanceFromLatLonInKm
              }
              disabled={this.state.disableButton}
              className={this.state.btnClassName}
            >
              Submit Your Guess!
            </button>
          </div>
        </>
      )
    }
  }
}

export default GoogleApiWrapper({
  apiKey: (googleMapsApiKey)
})(MapContainer)