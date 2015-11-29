///<reference path="../../typings/react/react.d.ts"/>
///<reference path="../../typings/redux/redux.d.ts"/>
declare module "redux-router" {
  import { Component } from 'react';
  import { Reducer } from 'redux';

  export function routerStateReducer(any): Reducer
  export function reduxReactRouter(any): any;
  export function pushState(any, string): Action;
  export class ReduxRouter extends Component<any, any> {}
}
