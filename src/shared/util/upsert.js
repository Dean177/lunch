import { findIndex } from 'underscore';

// If an element satisfying the comparator exists in the collection, return the collection with the
// updated value.
// If not, add the value to the collection.
// Does not mutate the original collection
export default function upsert(collection, predicate, value) {
  const valueIndex = findIndex(collection, predicate);
  return (valueIndex === -1) ?
    [...collection, value] :
    [
      ...collection.slice(0, valueIndex),
      value,
      ...collection.slice(valueIndex + 1, collection.length),
    ];
}
