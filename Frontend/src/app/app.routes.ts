import { Routes } from '@angular/router';
import { LoginPageComponent } from './login/login-page/login-page.component'
import { SignupPageComponent } from './login/signup-page/signup-page.component';
import { PostcardComponent } from './postcard/postcard.component';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';
import { PostcardDetailsComponent } from './postcardDetails/postcardDetails.component';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'feed', component: FeedComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'signup', component: SignupPageComponent },
    { path: 'logout', component: LogoutComponent },
    { path: '**', redirectTo: '' } // Redirect to home
    // { path: '**', component: 404Component }
]