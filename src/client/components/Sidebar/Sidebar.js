import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
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
    notGettingLunch: PropTypes.func.isRequired,
    offerToGetLunch: PropTypes.func.isRequired,
    peopleChoices: PropTypes.arrayOf(PersonChoice).isRequired,
    userLunchChoice: PersonChoice,
  };

  onGetLunch = (event) => {
    event.preventDefault();
    this.props.offerToGetLunch(this.props.userLunchChoice.choiceId);
  };

  onNoGetLunch = (event) => {
    event.preventDefault();
    this.props.notGettingLunch(this.props.userLunchChoice.choiceId);
  };

  onGone = (event) => {
    event.preventDefault();
    this.props.goneToFetchLunch(this.props.userLunchChoice.choiceId);
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
    const isFetching = userLunchChoice ? userLunchChoice.isFetching : false;

    if (!userLunchChoice) {
      return <span/>;
    }

    const displayPaymentAmount = hasAuthorizedSplitwiseToken && !isFetching;

    return (
      <Motion defaultStyle={{ xPosition: -500 }} style={{ xPosition: spring(userLunchChoice ? 0 : -500) }}>
        {value => (
          <div className='Sidebar' style={{ right: value.xPosition }}>
            <form className='User-Prefs'>
              <fieldset className='form-group' style={{ display: 'none' }}>
                <button className='btn btn-primary-outline Ready' onClick={this.onReady}>READY</button>
              </fieldset>

              <fieldset className='form-group action-buttons'>
                <button className={classnames('btn btn-secondary i-get', { hidden: isFetching })}
                        onClick={this.onGetLunch}>
                  I GET
                </button>
                <button className={classnames('btn btn-secondary i-no-get', { hidden: !isFetching })}
                        onClick={this.onNoGetLunch}>I NO GET</button>
                <button className={classnames('btn btn-secondary i-gone', { hidden: !isFetching })} onClick={this.onGone}>I GONE</button>
              </fieldset>

              <fieldset className='form-group'>
                <label>I want:</label>
                <textarea
                  rows='3'
                  className='i-want form-control'
                  onChange={this.onOrderChange}
                  value={userLunchChoice.orderDetails}
                />
              </fieldset>

              <fieldset className='form-group' style={{ display: displayPaymentAmount ? '' : 'none' }}>
                <label>It costs:</label>
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
