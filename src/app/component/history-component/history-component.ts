import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SessionCreateDto, SessionReadDto } from '../../DTOS/SessionDto';
import { SessionService } from '../../service/session-service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-history-component',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    RouterLink
  ],
  templateUrl: './history-component.html',
  styleUrl: './history-component.css',
})
export class HistoryComponent implements OnInit {

  sessions: SessionReadDto[] = [];
  userId: number = 0;

  editingSessionId: number | null = null;
  editForm: SessionCreateDto = { gameId: 0, temps: 0, dateRecord: '' };

  constructor(
    private sessionService: SessionService,
    private cdr: ChangeDetectorRef
  ) {}

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
        console.log("Données reçues:", data);
        this.sessions = data;

        // On force Angular à rafraîchir la vue immédiatement
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Erreur HTTP:", err)
    });
  }

  isNearCompletion(session: SessionReadDto): boolean {
    if (!session || !session.gameTempsEstimer) return false;
    return (session.temps / session.gameTempsEstimer) >= 0.8;
  }

  delete(sessionId: number) {
    if(confirm("Supprimer ?")) {
      this.sessionService.deleteSession(this.userId, sessionId).subscribe(() => {
        this.loadHistory();
      });
    }
  }

  startEdit(session: SessionReadDto) {
    this.editingSessionId = session.id;
    // On prépare le formulaire avec les valeurs actuelles
    this.editForm = {
      gameId: session.gameId,
      temps: session.temps,
      // Formatage simple pour l'input date (YYYY-MM-DD)
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
