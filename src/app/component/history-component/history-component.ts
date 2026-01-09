import {Component, OnInit} from '@angular/core';
import {SessionCreateDto, SessionReadDto} from '../../DTOS/SessionDto';
import {SessionService} from '../../service/session-service';
import {DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-history-component',
  imports: [
    DatePipe,
    FormsModule
  ],
  templateUrl: './history-component.html',
  styleUrl: './history-component.css',
})
export class HistoryComponent implements OnInit {

  sessions: SessionReadDto[] = [];
  userId: number = 0;

  editingSessionId: number | null = null;
  editForm: SessionCreateDto = { gameId: 0, temps: 0, dateRecord: '' };

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    const storedId = localStorage.getItem('userId');
    this.userId = Number(storedId);
    console.log("Init Historique - ID User:", this.userId);

    if (this.userId) {
      this.loadHistory();
    }
  }

  loadHistory() {
    this.sessionService.getHistory(this.userId).subscribe({
      next: (data) => {
        console.log("Données reçues (Brut):", data);
        this.sessions = data;
        // On force la détection de changement (parfois nécessaire)
        this.sessions = [...this.sessions];
      },
      error: (err) => console.error("Erreur HTTP:", err)
    });
  }

  isNearCompletion(session: SessionReadDto): boolean {
    // Sécurité maximale anti-crash
    if (!session || !session.gameTempsEstimer) return false;
    return (session.temps / session.gameTempsEstimer) >= 0.8;
  }

  delete(sessionId: number) {
    if(confirm("Supprimer ?")) {
      this.sessionService.deleteSession(this.userId, sessionId).subscribe(() => this.loadHistory());
    }
  }

  startEdit(session: SessionReadDto) {
    this.editingSessionId = session.id;
    this.editForm = {
      gameId: session.gameId,
      temps: session.temps,
      dateRecord: session.dateRecord ? session.dateRecord.split('T')[0] : ''
    };
  }

  cancelEdit() {
    this.editingSessionId = null;
  }

  saveEdit() {
    if (this.editingSessionId) {
      this.sessionService.updateSession(this.userId, this.editingSessionId, this.editForm)
        .subscribe(() => {
          this.editingSessionId = null;
          this.loadHistory();
        });
    }
  }

}
