import { save } from '../../storage/index';
import { logout } from './logout';
import { LsMock } from './login.test';

global.localStorage = new LsMock();

describe('logout', () => {
  it('Removes the valid user token on logout', () => {
    save('token', { profile: 'profile' });
    expect(localStorage.getItem('token')).toEqual('{"profile":"profile"}');
    logout();
    expect(localStorage.getItem('token')).toEqual(null);
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
