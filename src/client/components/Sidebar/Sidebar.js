import React, { Component, PropTypes } from 'react';
import PersonSquare from '../PersonSquare'

export default class Sidebar extends Component {
  static propTypes = {
    changeOrderDetails: PropTypes.func,
    goneToFetchLunch: PropTypes.func,
    offerToGetLunch: PropTypes.func,
    peopleChoices: PropTypes.array,
    userLunchChoice: PropTypes.object
  };

  onGetLunch = (event) => {
    event.preventDefault();
    this.props.offerToGetLunch(this.props.userLunchChoice.choiceId);
  };

  onGone = (event) => {
    event.preventDefault();
    this.props.goneToFetchLunch();
  };

  onOrderChange = (event) => {
    this.props.changeOrderDetails(event.target.value)
  };

  onReady = (event) => {
    event.preventDefault();
  };

  render() {
    const { peopleChoices, userLunchChoice } = this.props;
    if (!userLunchChoice) {
      return <span/>;
    }

    return (
      <div className="Sidebar">
        <form className="User-Prefs">
          <fieldset className="form-group">
            <label>I would specifically like:</label>
            <textarea
              rows="4"
              className="i-want form-control"
              onChange={this.onOrderChange}
              value={userLunchChoice.orderDetails}
            />
          </fieldset>

          <fieldset className="form-group" style={{display: 'none'}}>
            <button className="btn btn-primary Ready" onClick={this.onReady}>READY</button>
          </fieldset>

          <fieldset className="form-group action-buttons">
            <button className="btn btn-secondary IGet" type="button" onClick={this.onGetLunch}>I GET</button>
            <button className="btn btn-primary IGone" onClick={this.onGone} style={{display: 'none'}}>I GONE</button>
          </fieldset>

        </form>

        <div className="OthersOrders">
          {peopleChoices
            .filter((personChoice) => personChoice.choiceId === userLunchChoice.choiceId)
            .map(personChoice => (
              <div className="PersonOrder" key={personChoice.person.id}>
                <PersonSquare  person={personChoice.person} />
                <div className="PersonOrder">
                  <p>{personChoice.person.name} {personChoice.orderDetails ? 'wants:': ''}</p>
                  <pre>{personChoice.orderDetails}</pre>
                </div>
              </div>
            ))}
        </div>
      </div>
    )
  }
}
