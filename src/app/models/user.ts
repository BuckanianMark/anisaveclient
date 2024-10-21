import { FormControl } from '@angular/forms';
export interface UserRegistrationForm {
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    userName: FormControl<string>;
    password: FormControl<string>;
}

export interface userRegistration{
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}