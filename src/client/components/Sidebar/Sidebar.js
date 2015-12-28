import React, { Component, PropTypes } from 'react';
import { PersonChoice } from '../../PropTypes';
import { Motion, spring } from 'react-motion';
import PersonOrder from './components/PersonOrder';
import SplitwiseIntegration from './components/SplitwiseIntegration';

export default class Sidebar extends Component {
  static propTypes = {
    changeOrderDetails: PropTypes.func.isRequired,
    goneToFetchLunch: PropTypes.func.isRequired,
    offerToGetLunch: PropTypes.func.isRequired,
    peopleChoices: PropTypes.arrayOf(PersonChoice).isRequired,
    userLunchChoice: PersonChoice,
  };

  state = {
    paymentAmount: 0,
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
    this.props.changeOrderDetails(event.target.value);
  };

  onPaymentAmountChange = (event) => {
    this.setState({ paymentAmount: event.target.value });
  };

  onReady = (event) => {
    event.preventDefault();
  };

  render() {
    const { peopleChoices, userLunchChoice } = this.props;
    if (!userLunchChoice) {
      return <span/>;
    }

    const hasSplitwiseAuth = false;

    return (
      <Motion defaultStyle={{ xPosition: -500 }} style={{ xPosition: spring(0) }}>
        {value => (
          <div className='Sidebar' style={{ right: value.xPosition }}>
            <form className='User-Prefs'>
              <fieldset className='form-group'>
                <label>I would specifically like:</label>
                <textarea
                  rows='4'
                  className='i-want form-control'
                  onChange={this.onOrderChange}
                  value={userLunchChoice.orderDetails}
                />
              </fieldset>

              <fieldset className='form-group'>
                <label>I will pay the buyer:</label>
                <div className='input-group'>
                  <div className='input-group-addon'>£</div>
                  <input
                    type='number'
                    step='0.01'
                    className='i-pay form-control'
                    onChange={this.onPaymentAmountChange}
                    value={this.state.paymentAmount}
                  />
                </div>
              </fieldset>

              <fieldset className='form-group' style={{ display: 'none' }}>
                <button className='btn btn-primary-outline Ready' onClick={this.onReady}>READY</button>
              </fieldset>

              <fieldset className='form-group action-buttons'>
                <button className='btn btn-secondary IGet' type='button' onClick={this.onGetLunch}>I GET</button>
                <button className='btn btn-primary IGone' onClick={this.onGone} style={{ display: 'none' }}>I GONE</button>
              </fieldset>
            </form>

            <div className='OthersOrders'>
              {peopleChoices
                .filter((personChoice) => personChoice.choiceId === userLunchChoice.choiceId)
                .map(personChoice => (
                  <PersonOrder key={personChoice.person.id} personChoice={personChoice} />
                ))}
            </div>

            <SplitwiseIntegration isAuthorized={hasSplitwiseAuth} />
          </div>
        )}
      </Motion>
    );
  }
}
