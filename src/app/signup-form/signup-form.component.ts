import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {

  authError: any;

  constructor(private authService: AuthService) { }

  signUp(frm) {
    this.authError = this.authService.createUser(frm.value);
  }
}
