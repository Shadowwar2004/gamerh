import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {Observable} from 'rxjs';
import {SupportReadDto} from '../DTOS/SupportDto';
import {GameCreateDto} from '../DTOS/GameDto';
import { GameReadDto } from '../DTOS/GameDto';
@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Récupérer les supports pour la liste déroulante
  getSupports(): Observable<SupportReadDto[]> {
    return this.http.get<SupportReadDto[]>(`${this.apiUrl}/supports`);
  }

  // Créer un jeu
  // withCredentials: true est important si vous avez besoin du cookie d'auth (admin/user)
  create(game: GameCreateDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/games`, game, { withCredentials: true });
  }
  getGamesBySupport(supportId: number): Observable<GameReadDto[]> {
    return this.http.get<GameReadDto[]>(`${this.apiUrl}/supports/${supportId}/games`);
  }

}
