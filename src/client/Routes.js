import ChooseLunch from './ChooseLunch';
import Landing from './Landing/Landing';
import RouteContainer from './RouteContainer';
import UserConfig from './UserConfig/UserConfig';

const routes = {
  path: '',
  component: RouteContainer,
  childRoutes: [
    { path: '/', component: Landing },
    { path: 'lunch', component: ChooseLunch },
    { path: 'user', component: UserConfig },
  ],
};

export default routes;
