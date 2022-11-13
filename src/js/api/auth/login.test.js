import { login } from './login';

export class LsMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  getItem(key) {
    return this.store[key] || null;
  }

  remove(key) {
    delete this.store[key];
  }
}

global.localStorage = new LsMock();

const TEST_USERNAME = 'test_bombadil';
const TEST_EMAIL = 'bombadil_test@noroff.no';
const TEST_PW = '12345678';
export const TEST_TOKEN = 'token123';
const TEST_RESPONSE = {
  name: TEST_USERNAME,
  email: TEST_EMAIL,
  token: TEST_TOKEN,
};

function fetchSuccess() {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve(TEST_RESPONSE),
  });
}

function fetchFailure() {
  return Promise.resolve({
    ok: false,
    status: 401,
    statusText: 'Unauthorized',
  });
}

describe('login', () => {
  it('Returns a valid object when provided with a valid ID', async () => {
    global.fetch = jest.fn(() => fetchSuccess());
    const item = await login(TEST_EMAIL, TEST_PW);
    global.localStorage.setItem('token', TEST_TOKEN);
    expect(item).toEqual(TEST_RESPONSE);
    expect(item.token).toEqual(global.localStorage.getItem('token'));
  });

  it('Throws a new error message at bad requests', async () => {
    global.fetch = jest.fn(() => fetchFailure());
    await expect(login(TEST_EMAIL, TEST_PW)).rejects.toThrow('Unauthorized');
  });
});
