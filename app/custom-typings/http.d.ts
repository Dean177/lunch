declare module "http" {
  interface ServerImpl {
    listen(port: any, callback: any): any;
  }

  interface ServerCons {
    new(app: any): ServerImpl;
  }

  export var Server: ServerCons;
}
