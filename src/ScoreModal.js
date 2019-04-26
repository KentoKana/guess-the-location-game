import React from 'react';
import Modal from 'react-responsive-modal';

export default class ScoreModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
    };

    this.reset = true;
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.props.reset(true);
  };

  // A placeholder function for onClose property.
  // The onClose prop is required by default, but I have no use for it.
  //Had to create a placeholder function so that the console won't throw an error.
  onClosePlaceholder =()=> {
    this.setState({ open: true });
  }

  render() {
    return (
      <div>
        <Modal
          open={this.state.open}
          onClose={this.onClosePlaceholder}
          center
          style={{
            width: '300px',
          }}
          showCloseIcon={false}
        >
          <h3>Congratulations! You Found The Target Location!</h3>
          <table>
            <tbody>
              <tr>
                <th>Target City:</th>
                <td>
                  {this.props.targetCityName}
                </td>
              </tr>
              <tr>
                <th>Number of Guesses Made</th>
                <td>
                  {this.props.numberOfGuesses}
                </td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={this.onCloseModal}
            className={'primaryBtn'}
          >
            Play Another Round
          </button>
        </Modal>
      </div>
    );
  }
}
