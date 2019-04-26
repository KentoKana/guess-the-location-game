import React from 'react';

class DistanceDisplay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }

  }

  render() {
    if (this.props.distanceAwayFromTarget === '') {
      return (
        <div>
          <h2 className="distanceDisplayHeading">Pick location on the mini-map and make your first guess!</h2>
        </div>
      )
    }
    return (
      <div className="flex_row distanceDisplayHeading">
        <h2>
          You are
          <span className="primary-highlight"> {Math.round(this.props.distanceAwayFromTarget, 0)}KM </span>
          away from the target.
        </h2>
        <h2>
          Number of Guesses Made: <span className="primary-highlight">{this.props.getNumberOfGuessesMade}</span>
        </h2>
        
      </div>
    );
  }
}

export default DistanceDisplay;