declare module "rewire" {
  export default function rewire(path: string): {
    [key: string]: any
    __set__(importName: string, module: any): void;
  }
}
