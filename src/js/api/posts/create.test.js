import { createPost } from './create';

const TEST_TITLE = 'Title';
const TEST_BODY = 'Body';
const TEST_RESPONSE = {
  title: TEST_TITLE,
  body: TEST_BODY,
};

function postSucces() {
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve(TEST_RESPONSE),
  });
}

function postFailure() {
  return Promise.resolve({
    ok: false,
    status: 404,
    statusText: 'Failed to create post',
  });
}

describe('createPost', () => {
  it('creates a new post on the API', async () => {
    global.fetch = jest.fn(() => postSucces());
    const response = await createPost(TEST_TITLE, TEST_BODY);
    expect(response).toEqual(TEST_RESPONSE);
    expect(response.title).toEqual(TEST_TITLE);
    expect(response.body).toEqual(TEST_BODY);
  });

  it('fails to create a new post on the API', async () => {
    global.fetch = jest.fn(() => postFailure());
    await expect(
      createPost(TEST_TITLE, TEST_BODY).rejects.toThrow('Failed to create post')
    );
  });
});
