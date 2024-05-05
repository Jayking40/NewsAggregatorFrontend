import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Store } from '@ngxs/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SetAccessToken, SetUserData } from '../../../store/app.action';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private signupService: AuthenticationService,
    private store: Store,
    private notification: NzNotificationService,
    private router: Router,
  ) { }

  onSubmit() {
    const userData = {
      "username": this.name,
      "email": this.email,
      "password": this.password
    };

    this.signupService.signUp(userData)
      .subscribe({
        next: (res) => {
          this.store.dispatch(new SetAccessToken(res.accessToken));
          this.store.dispatch(new SetUserData({
            userName: res.username,
            userId: res.userId
          }));

          this.router.navigate(['/']);
          this.notification.success('Sign Up Successful', '');
        },
        error: (err) => {
          if (err.error.statusCode === 400) {
            this.notification.error(err.error.message, 'Signup Error');
          } else {
            this.notification.error('An error occurred. Please try again.', '');
            // Consider logging the error for debugging
          }
        }
      });
  }
}
