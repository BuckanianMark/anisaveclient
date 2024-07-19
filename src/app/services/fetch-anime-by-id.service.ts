import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import { GET_ANIME_BY_ID } from '../GraphQl/query';
import {  AnimeWithCharactersType } from '../models/anime';

@Injectable({
  providedIn: 'root'
})
export class FetchAnimeByIdService extends Query<AnimeWithCharactersType>{
  override document = GET_ANIME_BY_ID

 
}
