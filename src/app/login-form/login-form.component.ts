import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  authError: any;

  constructor(private authService: AuthService) { }

  login(frm) {
    this.authError = this.authService.login(frm.value);
  }

}
