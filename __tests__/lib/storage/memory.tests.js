'use strict';

import Storage from '../../../src/lib/storage/memory';

describe('MemoryStorage', () => {
  it('rejects saving non-object', () => {
    var store = new Storage('test');

    return expect(store.save('oops'))
      .rejects.toThrow('Failed to save non-object to "test"');
  });

  it('can save an object', () => {
    var store = new Storage('test');
   
    return store.save({ name: 'Ethan' })
      .then(saved => {
        expect(saved).toBeDefined();
        expect(saved.id).toBeDefined();
        expect(saved.name).toBe('Ethan');	
   
        return store.get(saved.id)
          .then(fromStore => {
            expect(fromStore).toEqual(saved);
          });
      });
  });
   
  it('rejects if get is provided a missing id', () => {
    var store = new Storage('test');
   
    return expect(store.get('missing'))
      .rejects.toThrow('Document with id "missing" in schema "test" not found');
  });
   
  it('resolves with empty array for getAll on empty store', () => {
    var store = new Storage('test');
   
    return store.getAll()
      .then(results => {
        expect(results).toEqual([]);
      });
  });

  it('resolves with expected array for getAll on non-empty store', () => {
    var store = new Storage('test');
   
    var toSave = [
      { name: 'Ethan' },
      { class: 'DeltaV' },
    ];
   
    return Promise.all(
      toSave.map(obj => store.save(obj)))
      .then(saved => {
        return store.getAll()
          .then(results => {
            expect(results).toEqual(saved);
          });
      });	
  });
});