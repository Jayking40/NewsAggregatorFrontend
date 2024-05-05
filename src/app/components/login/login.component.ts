import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormsModule } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SetAccessToken, SetUserData } from '../../../store/app.action';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private loginService: AuthenticationService,
    private notification: NzNotificationService,
    private router: Router,
    private store: Store,
  ) { }

  onSubmit() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.loginService.login(credentials).subscribe({
      next: (res: any) => {
        this.store.dispatch(new SetAccessToken(res.data.access_token));
        this.store.dispatch(
          new SetUserData({
            userName: res.data.userName,
            userId: res.data.userId,
          })
        );

        this.router.navigate(['/']).then();
        this.notification.success('Login Successful', '');
      },
      error: (err) => {
        if (err.error.statusCode === 403) {
          this.notification.error(err.error.message, '');
        } else {
          this.notification.error('An error occurred', '');
        }
      },
    });
  }

}
