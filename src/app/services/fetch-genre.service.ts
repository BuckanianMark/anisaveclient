import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import { GET_GENRE } from '../GraphQl/query';
import { GenreType } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class FetchGenreService extends Query<GenreType>{

 override document = GET_GENRE;
}
