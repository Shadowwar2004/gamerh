import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {SessionCreateDto, SessionReadDto} from '../DTOS/SessionDto';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createSession(userId: number, session: SessionCreateDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${userId}/history/records`, session, { withCredentials: true });
  }

  // Récupérer l'historique
  getHistory(userId: number): Observable<SessionReadDto[]> {
    return this.http.get<SessionReadDto[]>(`${this.apiUrl}/users/${userId}/history`, { withCredentials: true });
  }

  // Modifier
  updateSession(userId: number, sessionId: number, session: SessionCreateDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}/history/records/${sessionId}`, session, { withCredentials: true });
  }

  // Supprimer
  deleteSession(userId: number, sessionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}/history/records/${sessionId}`, { withCredentials: true });
  }


}
