import './AutosuggestTheme.scss';
import './Landing.scss';
import { connect } from 'react-redux';
import { compose } from 'underscore';
import { routeActions } from 'react-router-redux';
import { enterOptionName, addLunchOption } from '../../shared/actionCreators/lunchActionCreators';

import Landing from './Landing';

const mapStateToProps = (state) => ({
  optionName: state.lunch.optionName,
  lunchOptions: state.lunch.lunchOptions,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  addLunchOption: compose(dispatch, addLunchOption),
  enterOptionName: compose(dispatch, enterOptionName),
  navigateToRoute: compose(dispatch, routeActions.push),
});

const ConnectedLanding = connect(mapStateToProps, mapDispatchToProps)(Landing);

export default ConnectedLanding;
