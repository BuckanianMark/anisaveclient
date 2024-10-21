import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import { REGISTER_USER } from '../GraphQl/mutation';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends Mutation{

  override document = REGISTER_USER
}
