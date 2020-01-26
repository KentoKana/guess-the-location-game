import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import MapContainer from './Map.js';
import Nominatim from 'nominatim-geocoder';
import DistanceDisplay from './DistanceDisplay';
import ScoreModal from './ScoreModal';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      latLng: {
        lat: '',
        lng: '',
      },
      distanceAwayFromTarget: '',
      reset: false,
      numberOfGuesses: 0,
    }
    this.latLng = {
      lat: '',
      lng: '',
    }
  }

  //Function to reset the game and get new coordinates.
  reset = (stat) => {
    this.setState({
      reset: stat,
      distanceAwayFromTarget: '',
      latLng: {
        lat: '',
        lng: '',
      },
    })
    this.getCoord();
    this.currentTargetCityName = '';
  }

  //API to check whether coordinates have a google street view.
  //https://stackoverflow.com/questions/13236312/how-to-detect-if-google-streetview-is-available-in-an-address-coordinates
  //Obtain the status of whether or not street view exists for a particular randomly selected city.
  getCoordWithStreetView = (latLng) => {
    axios.get(`https://maps.googleapis.com/maps/api/streetview/metadata?key=AIzaSyBGPikSEe4MZL4lAf02oKw9t49Z3iBEcyU&location=${latLng.lat},${latLng.lon}`)
      .then(res => {
        console.log(latLng);
        console.log(res.data.status);
        let newLatLng = {};
        if (res.data.status === "OK") {
          //if street view is available, then set latLng state to that latLng.
          newLatLng = {
            lat: latLng.lat,
            lng: latLng.lon,
          };
          this.setState({ latLng: newLatLng });
        } else {
          //If street view is not available, reset latitude and longitude prop,
          //then get new coordinates.
          newLatLng = {
            lat: '',
            lng: '',
          };
          this.latLng = newLatLng;
          this.getCoord();
        }
      })
  }

  //Obtain the number of guesses made before reaching the target map.
  getNumberOfGuessesMade = (num) => {
    this.setState({
      numberOfGuesses: num,
    })
  }

  //country.io API to get a list of countries in the world.
  getCountries = () => {
    axios.get(`https://cors-anywhere.herokuapp.com/http://country.io/capital.json`)
      .then(res => {
        let countries = Object.values(res.data);
        countries = countries.filter(country => country.length > 0);
        this.setState({ countries: countries });
      })
  }

  //Get random city from the list of cities.
  getRandomCity = () => {
    return Math.floor(Math.random() * (this.state.countries.length));
  }

  //Once the component mounted, get the list of cities.
  componentDidMount() {
    this.getCountries();
  }

  //Get the distance between location that the user guessed, and the target location.
  getDistanceAwayFromTarget = (distance) => {
    this.setState({ distanceAwayFromTarget: distance });
  }



  //Get the coordinates of the target location.
  getCoord = () => {
    const geocoder = new Nominatim();

    geocoder.search({ q: this.state.countries[this.getRandomCity()] })
      .then((response) => {
        // console.log(response);
        let i = Math.floor(Math.random() * (response.length));
        if (response[i]) {
          //once city item is is available, run getCoordWithStreetView with those coordinates. 
          //If the street view is not available, this function will be called again, until getCoordWithStreetView finds a coordinate with streetviews.
          this.getCoordWithStreetView(response[i]);
          this.currentTargetCityName = response[i].display_name;
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    //If the state of latLng is empty, search for a new location.
    if (this.state.latLng.lat === '' && this.state.latLng.lng === '') {
      this.getCoordWithStreetView(this.latLng);
      return (
        <div className="loadingIconContainer">
          <div  className="loadingIcon">
            <div>
              Loading...
          {/* Icon credit to: https://www.iconfinder.com/icons/285659/map_marker_icon */}
            </div>
            <div>
              <img id="loadingIcon" src="marker.svg" alt="Loading Icon" width="100" />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="App">
          <DistanceDisplay
            distanceAwayFromTarget={this.state.distanceAwayFromTarget}
            getNumberOfGuessesMade={this.state.numberOfGuesses}
          />

          <MapContainer
            coord={this.state.latLng}
            getDistanceAwayFromTarget={this.getDistanceAwayFromTarget}
            getNumberOfGuessesMade={this.getNumberOfGuessesMade}
          />
          {
            parseInt(this.state.distanceAwayFromTarget) < 50 ?
              <ScoreModal
                open={true}
                targetCityName={this.currentTargetCityName}
                reset={this.reset}
                numberOfGuesses={this.state.numberOfGuesses}
              /> :
              <>

              </>
          }

        </div>
      );
    }
  }
}
export default App;