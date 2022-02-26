import { reduceArrayToString, charCounter, getLastItemUrl } from '../strings';

describe('Strings', () => {
  test('Reduce Array to String', () => {
    const test = [
      ['name 1', 'name 2'],
      ['name 3', 'name 4'],
      ['name 5', 'name 6'],
    ];

    const result = reduceArrayToString(test);

    expect(result).toBe('name 1,name 2,name 3,name 4,name 5,name 6');
  });

  test('Chars counter', () => {
    const test = 'name 1,name 2,name 3,name 4,name 5,name 6';

    const result = charCounter(test, 'a');

    expect(result).toBe(6);
  });

  test('Chars counter case sensitive', () => {
    const test = 'nAme 1,nAme 2,name 3,name 4,name 5,name 6';

    const result = charCounter(test, 'a');

    expect(result).toBe(6);
  });

  test('Get last item url', () => {
    const test = 'https://rickandmortyapi.com/api/character/240';

    const result = getLastItemUrl(test);

    expect(result).toBe('240');
  });
});
