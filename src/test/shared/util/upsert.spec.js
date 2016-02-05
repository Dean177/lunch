import { expect } from 'chai';
import upsert from '../../../shared/util/upsert';

describe('upsert', () => {
  const ant = { id: 0, name: 'ant' };
  const bear = { id: 1, name: 'bear' };
  const camel = { id: 2, name: 'camel' };
  const donkey = { id: 3, name: 'donkey' };
  const echinda = { id: 4, name: 'echinda' };

  it('Returns an array formed by replacing the first element matching the predicate with the supplied value', () => {
    const animals = [ant, camel, donkey];
    const replacedArray = upsert(animals, (animal) => animal.id === camel.id, bear);

    expect(replacedArray).to.deep.equal([ant, bear, donkey]);
  });

  it('Should add the value to the array when no match is found', () => {
    const animals = [ant, camel, donkey];
    const replacedArray = upsert(animals, (animal) => animal.id === echinda.id, echinda);

    expect(replacedArray).to.deep.equal([...animals, echinda]);
  });

  it('Works with empty arrays', () => {
    const replacedArray = upsert([], (animal) => animal.id === echinda.id, echinda);

    expect(replacedArray).to.deep.equal([echinda]);
  });

  it('Works with arrays with a single element', () => {
    const replacedArray = upsert([donkey], (animal) => animal.id === echinda.id, echinda);

    expect(replacedArray).to.deep.equal([donkey, echinda]);
  });
});
