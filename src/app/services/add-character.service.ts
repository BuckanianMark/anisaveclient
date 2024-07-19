import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import { Character } from '../models/character';
import { ADD_CHARACTER } from '../GraphQl/mutation';

@Injectable({
  providedIn: 'root'
})
export class AddCharacterService extends Mutation<Character>{

   override document = ADD_CHARACTER;
}
