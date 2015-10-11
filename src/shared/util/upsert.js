import { findIndex } from 'underscore';

// If an element satisfying the comparator exists in the collection, return the collection with the updated value.
// If not, add the value to the collection.
// Does not mutate the original collection
export default function upsert(collection, predicate, value) {
  const valueIndex = findIndex(collection, (predVal) => { return predicate(predVal); });
  if (valueIndex == -1) {
    return [...collection, value];
  } else {
    return [...collection.slice(0, valueIndex), value, ...collection.slice(valueIndex + 1, collection.length)];
  }
}