///<reference path="../../typings/react/react.d.ts"/>
declare module "react-motion" {
  import { Component } from 'react';
  export class Motion extends Component<any, any> {}
  export function spring(num: number): any;
}
