export interface Anime {
    animeId: number;
    title: string;
    overview: string;
    genre: string;
    duration: number;
    posterPath: string;
  }
  export type AnimeType = {
    animeList:Anime[];
  }

  export interface AnimeWithCharacters{
    animeId: number;
    title: string;
    overview: string;
    genre: string;
    duration: number;
    posterPath: string;
    characters:[
      {
        characterName:string;
        characterPosterPath:string
      }
    ]
  }
  export type AnimeWithCharactersType = {
    animeList:AnimeWithCharacters[]
  }

  