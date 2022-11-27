import { load, remove, save } from '../../storage/index';
import { logout } from './logout';
import { LsMock, TEST_TOKEN } from './login.test';

global.localStorage = new LsMock();

describe('logout', () => {
  it('Removes the valid user token on logout', () => {
    localStorage.setItem('token', JSON.stringify(TEST_TOKEN));
    logout();
    expect(localStorage.getItem('token').toEqual(undefined));
  });
});

// describe('logout', () => {
//   it('removes an item from the storage', () => {
//     const key = 'user';
//     const value = ['email', 'pw'];
//     global.localStorage.setItem(key, value);
//     expect(global.localStorage.load(key)).toEqual(value);
//     global.localStorage.removeItem(key);
//     expect(global.localStorage.load(key)).toEqual(undefined);
//   });
// });
