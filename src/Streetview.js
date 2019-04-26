import React, { Component } from 'react';
import ReactStreetview from './react-streetview';
 
class Streetview extends Component {
    constructor(props) {
        super(props);
        this.panoramaOptions = {
          position: {
            lat: parseFloat(this.props.coord.lat),
            lng: parseFloat(this.props.coord.lng),
          },
          pov: { heading: 100, pitch: 0 },
          zoom: 1,
          showRoadLabels: false,
          streetViewControl: false,
          disableDefaultUI: true,
        }
      }

    render() {
        return (
            <div style={{
                width: '100%',
                height: '90vh',
                backgroundColor: '#eeeeee',
                position: 'fixed'
            }}>
                <ReactStreetview
                    apiKey={this.props.apiKey}
                    streetViewPanoramaOptions={this.panoramaOptions}
                />
             
            </div>
        );
    }
}

export default Streetview;
