import { test } from "@playwright/test";
import { ChuckNorrisJoke } from "./type/apiResponse";

test.describe.configure({ mode: 'serial' });
test.describe('retrieve Chuck Norris joke',{
    annotation: {
      type: 'api joke',
      description: 'testing reponse and status code',
    },
  }, () => {
  test('test API response' , {tag: '@APIresponse'}
    ,async ({ request }) => {
    const response = await request.get('https://api.chucknorris.io/jokes/random');
    if (response.status() === 200) {
      console.log('Status is 200');
    } else {
      console.log('Status is not 200, HUSTON we have a problem');
    }
  });
  test('test API content' , {tag: '@ChuckNorris'}
    ,async ({ request }) => {
    const response = await request.get('https://api.chucknorris.io/jokes/random');
    const chuckNorrisJoke: ChuckNorrisJoke = await response.json()
    console.log(chuckNorrisJoke.value);
  });
})