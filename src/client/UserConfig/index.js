import './UserConfig.scss';

import UserConfig from './UserConfig';
import { compose } from 'underscore';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { changeName, changeImageUrl } from '../../shared/actionCreators/userActionCreator';
import { splitwiseAuthAttempt } from '../../shared/actionCreators/authActionCreator';


const mapStateToProps = (appState) => ({
  auth: appState.auth,
  user: appState.user,
});

const mapDispatchToProps = (dispatch) => ({
  changeImageUrl: compose(dispatch, changeImageUrl),
  changeName: compose(dispatch, changeName),
  navigateToRoute: compose(dispatch, routeActions.push),
  splitwiseAuthAttempt: compose(dispatch, splitwiseAuthAttempt),
});

const ConnectedUserConfig = connect(mapStateToProps, mapDispatchToProps)(UserConfig);

export default ConnectedUserConfig;
