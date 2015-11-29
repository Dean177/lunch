interface Action {
  type: string;
  payload: any;
  meta: any;
}

interface Dispatch extends Function { (Action): void }

interface TypedReducer<T> { (state: T, action: Action): T }
