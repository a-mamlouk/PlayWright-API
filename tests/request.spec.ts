import { expect, test } from "@playwright/test"

test(' req Graph QL', async ({ request }) => {
    const allCountriesResponse = await request.post('https://countries.trevorblades.com/', {
        data:{
            query: `
            {
            countries{
                code
                emoji
                languages {
                    name
                    code
                    }
                }
             }`
        }
    })

    const allCountries = await allCountriesResponse.json()
    expect(allCountriesResponse.status()).toBe(200)
    expect(allCountries.data.countries).toHaveLength(250)
})

test('Filter Country', async ({ request }) => {
    const countryResponse = await request.post('https://countries.trevorblades.com/', {
        data:{
            query: `
            {
            countries(filter: {code: {eq: "TN"}}){ 
                code
                emoji
                languages {
                    name
                    code
                    }
                }
             }`
        }
    })

    const countryData = await countryResponse.json()
    expect(countryResponse.status()).toBe(200)
    expect(countryData.data.countries).toHaveLength(1)
    expect(countryData.data.countries[0].code).toBe('TN')
})