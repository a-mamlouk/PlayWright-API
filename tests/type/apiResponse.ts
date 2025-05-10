export type ChuckNorrisJoke ={
    icon_url: string;
    id: string;
    url: string;
    value: string;
  }

  export interface Language {
    name: string;
    code: string;
  }
  
  export interface Country {
    code: string;
    emoji: string;
    languages: Language[];
  }
  
  export interface CountriesResponse {
    data: {
      countries: Country[];
    };
  }