import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import { AnimeType } from '../models/anime';
import { GET_ANIMES } from '../GraphQl/query';

@Injectable({
  providedIn: 'root'
})
export class FetchAnimeListService extends Query<AnimeType>{
   override document = GET_ANIMES;
  
}
