// import { remove } from '../../storage';
import { logout } from './logout';
import { LsMock, TEST_TOKEN } from './login.test';

global.localStorage = new LsMock();

describe('logout', () => {
  it('Removes the valid user token on logout', () => {
    localStorage.setItem('token', JSON.stringify(TEST_TOKEN));
    logout();
    expect(localStorage.getItem('token').toEqual(null));
  });
});
