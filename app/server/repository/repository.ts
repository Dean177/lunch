import db from './db';

const lunchOptions = 'lunchOptions';

export function getAll() {
  return db.select().from(lunchOptions);
}

export function add(lunchOption) {
  return db(lunchOptions).insert(lunchOption);
}
