import { gql } from "apollo-angular";
export const GET_GENRE = gql`
    query FetchGenreList {
        genreList{
            genreId
            genreName
        }
    }
`

export const GET_ANIMES =   gql`
query FetchAnimeList{
    animeList{
        animeId
        title
        genre
        posterPath
        duration
        overview
    }
}
`

export const GET_ANIME_BY_ID =  gql`
query FetchAnimeList($filterInput:Int!){
    animeList(where: {animeId:{eq:$filterInput}}){
        animeId
        title
        genre
        posterPath
        duration
        overview
        characters{
            characterName
            characterPosterPath
        }
    }
}
`