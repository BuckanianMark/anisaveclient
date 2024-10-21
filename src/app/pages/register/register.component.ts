import { Component } from '@angular/core';
import { NonNullableFormBuilder, FormGroup,Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserRegistrationForm,userRegistration } from '../../models/user';
import { ReplaySubject, takeUntil } from 'rxjs';
import { RegistrationService } from '../../services/registration.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  protected submitted = false;
  private destroyed$ = new ReplaySubject<void>(1);
  protected userRegistrationForm!:FormGroup<UserRegistrationForm>;
  constructor(
    private fb:NonNullableFormBuilder,
    private registerService:RegistrationService,
    private toastr:ToastrService,
    private router:Router){
    this.initializeForm()
  }
  private  initializeForm():void{
    this.userRegistrationForm = this.fb.group(
      {
        firstName : this.fb.control('',Validators.required),
        lastName : this.fb.control('',Validators.required),
        userName : this.fb.control('',Validators.required),
        password:this.fb.control('',Validators.required)
      }
    )
  }
  registerUser():void{
    this.submitted = true;
    const userRegistrationData:userRegistration = {
      firstName: this.userRegistrationForm.value.firstName ?? '',
      lastName: this.userRegistrationForm.value.lastName ?? '',
      username: this.userRegistrationForm.value.userName ?? '',
      password: this.userRegistrationForm.value.password ?? '',
    }
    if(this.userRegistrationForm.valid){
      this.registerService.mutate({
        registerRequestDto:userRegistrationData
      })
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next:(res) => {
          if(res.data?.userRegistration.isRegistrationSuccess){
            this.toastr.success("User Registered Successfully!!")
            this.router.navigate(['/login'])
          }
        }
      })
    }
  }

}
