import { Routes } from '@angular/router';
import { NewsListComponent } from './components/news-list/news-list.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
export const routes: Routes = [
    { path: '', component: NewsListComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }

];
