import { login } from './login';

function fetchSuccess() {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve(TEST_ITEM),
  });
}

describe('getItem', () => {
  it('Returns a valid object when provided with a valid ID', async () => {
    global.fetch = jest.fn(() => fetchSuccess());
    const item = await getItem(1);
    expect(item).toEqual(TEST_ITEM);
  });
});
