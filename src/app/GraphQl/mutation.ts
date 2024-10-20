import { gql } from "apollo-angular";

export const ADD_ANIME = gql`
    mutation AddAnime($animeData:AnimeRequestDtoInput!)
    {
        addAnime(anime:$animeData){
            anime{
                title
            }
        }
    }
`

export const ADD_CHARACTER = gql`
    mutation AddCharacter($characterData:CharacterRequestDtoInput!)
{
    addCharacter(character:$characterData){
        character{
            characterName
        }
    }
}
`
export const REGISTER_USER = gql`
   mutation RegisterUser($registerRequestDto:RegisterRequestDtoInput!){
    registerUser(registerRequestDto:$registerRequestDto){
        isRegistrationSuccess
    }
   }
`