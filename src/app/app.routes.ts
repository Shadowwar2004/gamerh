import { Routes } from '@angular/router';
import {LoginComponent} from './component/login-component/login-component';
import {HomeComponent} from './component/home-component/home-component';
import {CreateGameComponent} from './component/create-game-component/create-game-component';

export const routes: Routes = [
  {path : 'home', component : HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'create-game', component: CreateGameComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
