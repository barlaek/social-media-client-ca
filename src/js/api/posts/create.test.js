import { createPost } from './create';

const TEST_INPUTS = {
  title: 'test',
  body: 'test',
  media: 'test',
  tags: 'test',
};

function postSucces() {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve(TEST_INPUTS),
  });
}

describe('create post', () => {
  it('creates an item on the API', async () => {
    global.fetch = jest.fn(() => postSucces());
    const item = await createPost(TEST_INPUTS);
    expect(item).toEqual(TEST_INPUTS);
  });
});
