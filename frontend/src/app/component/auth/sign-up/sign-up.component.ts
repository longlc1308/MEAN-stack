import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public signUpForm : FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.signUpForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  onSignUp(){
    if(this.signUpForm.invalid){
      return
    }
    this.authService.createUser(this.signUpForm.value.email, this.signUpForm.value.password)
    }
  onReset() {
    this.signUpForm.reset()
  }
}

