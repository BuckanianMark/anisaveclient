import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import { ADD_ANIME } from '../GraphQl/mutation';

@Injectable({
  providedIn: 'root'
})
export class AddAnimeService extends Mutation{

 override document = ADD_ANIME
}
