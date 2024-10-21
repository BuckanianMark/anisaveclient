import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import { REGISTER_USER } from '../GraphQl/mutation';
import { RegistrationType } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends Mutation<RegistrationType>{

  override document = REGISTER_USER
}
