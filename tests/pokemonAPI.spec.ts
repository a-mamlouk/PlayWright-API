import { test } from "@playwright/test";

test.describe.configure({ mode: 'serial' });
test.describe('pokémon Api',{
    annotation: {
      type: 'Pokémon API',
      description: 'Testing https://pokeapi.co/ ',
    },
  }, () => {
  test('test API response' , {tag: '@APIresponse'}
    ,async ({ request }) => {
        const response = await request.get('https://pokeapi.co/api/v2/');
        if (response.status() === 200) {
        console.log('Status is 200');
        } else {
        console.log('Status is not 200, HUSTON we have a problem');
        }
    })
    test('test API content' , {tag: '@Pokemon'},async ({ request }) => {
        const pokemonApiResponse = await request.get('https://pokeapi.co/api/v2/');
        const pokemonData = await pokemonApiResponse.json()
        console.log("pokémon data ",pokemonData);
        const pokemonVersion = pokemonData.version;
        console.log("pokémon version ",pokemonVersion);

        const versionData = await request.get(pokemonVersion);
        const version = await versionData.json()    
        console.log("version data ",version);
    })
})