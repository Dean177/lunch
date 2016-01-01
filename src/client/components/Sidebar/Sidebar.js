import React, { Component, PropTypes } from 'react';
import { PersonChoice } from '../../PropTypes';
import { Motion, spring } from 'react-motion';
import PersonOrder from './components/PersonOrder';
import SplitwiseIntegration from './components/SplitwiseIntegration';

export default class Sidebar extends Component {
  static propTypes = {
    changeOrderDetails: PropTypes.func.isRequired,
    enterPaymentAmount: PropTypes.func.isRequired,
    goneToFetchLunch: PropTypes.func.isRequired,
    hasAuthorizedSplitwiseToken: PropTypes.bool.isRequired,
    offerToGetLunch: PropTypes.func.isRequired,
    peopleChoices: PropTypes.arrayOf(PersonChoice).isRequired,
    userLunchChoice: PersonChoice,
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
    this.props.enterPaymentAmount(event.target.value);
  };

  onReady = (event) => {
    event.preventDefault();
  };

  render() {
    const { peopleChoices, userLunchChoice, hasAuthorizedSplitwiseToken } = this.props;
    if (!userLunchChoice) {
      return <span/>;
    }

    const displayPaymentAmount = hasAuthorizedSplitwiseToken && !userLunchChoice.isFetching;

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

              <fieldset className='form-group' style={{ display: displayPaymentAmount ? '' : 'none' }}>
                <label>I will pay the buyer:</label>
                <div className='input-group'>
                  <div className='input-group-addon'>£</div>
                  <input
                    type='text'
                    className='i-pay form-control'
                    onChange={this.onPaymentAmountChange}
                    value={userLunchChoice.paymentAmount || ''}
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

            <SplitwiseIntegration isAuthorized={hasAuthorizedSplitwiseToken} />
          </div>
        )}
      </Motion>
    );
  }
}
