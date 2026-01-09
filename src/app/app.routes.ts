import { Routes } from '@angular/router';
import {LoginComponent} from './component/login-component/login-component';
import {HomeComponent} from './component/home-component/home-component';
import {CreateGameComponent} from './component/create-game-component/create-game-component';
import {ListGameComponent} from './component/list-game-component/list-game-component';
import {CreateSessionComponent} from './component/create-session-component/create-session-component';
import {HistoryComponent} from './component/history-component/history-component';

export const routes: Routes = [

  {path : 'home', component : HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'create-game', component: CreateGameComponent },
  { path: 'games', component: ListGameComponent },
  { path: 'add-session', component: CreateSessionComponent },
  { path: 'history', component: HistoryComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
