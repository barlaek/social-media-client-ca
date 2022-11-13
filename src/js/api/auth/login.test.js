import { login } from './login';

const TEST_ID = 1;
const TEST_BAD_ID = 'string';
const TEST_ITEM = { id: TEST_ID, name: 'Test item' };

function fetchSuccess() {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve(TEST_ITEM),
  });
}

function fetchFailure(status = 404, statusText = 'Not found') {
  return Promise.resolve({
    ok: false,
    status,
    statusText,
  });
}

describe('login', () => {
  it('Returns a valid object when provided with a valid ID', async () => {
    global.fetch = jest.fn(() => fetchSuccess());
    const item = await login(1);
    expect(item).toEqual(TEST_ITEM);
  });

  it('Returns undefined when an HTTP 404 error is received', async () => {
    global.fetch = jest.fn(() => fetchFailure());
    const item = await login(1);
    expect(item).toEqual(undefined);
  });
});
