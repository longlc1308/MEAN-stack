import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  public loginForm: FormGroup;
  constructor(
    public authService: AuthService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin(){
    if(this.loginForm.invalid){
      return
    }
    this.authService.logIn(this.loginForm.value.email, this.loginForm.value.password)
  }
  onReset() {
    this.loginForm.reset();
  }

}
