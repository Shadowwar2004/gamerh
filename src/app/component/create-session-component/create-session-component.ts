import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GameService } from '../../service/game-service';
import { SessionService } from '../../service/session-service';
import { SessionCreateDto } from '../../DTOS/SessionDto';
import { GameReadDto } from '../../DTOS/GameDto';
import { SupportReadDto } from '../../DTOS/SupportDto';
import { FormsModule } from '@angular/forms';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-create-session-component',
  imports: [ FormsModule,RouterLink ],
  templateUrl: './create-session-component.html',
  styleUrl: './create-session-component.css',
})
export class CreateSessionComponent implements OnInit {

  supports: SupportReadDto[] = [];
  games: GameReadDto[] = [];
  selectedSupportId: number = 0;

  session: SessionCreateDto = {
    gameId: 0,
    temps: 0,
    dateRecord: new Date().toISOString().split('T')[0]
  };

  successMessage = '';
  errorMessage = '';

  constructor(
    private gameService: GameService,
    private sessionService: SessionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Charger les supports
    this.gameService.getSupports().subscribe(data => {
      this.supports = data;
      this.cdr.detectChanges();
    });
  }

  onSupportChange(): void {
    if (this.selectedSupportId) {
      this.gameService.getGamesBySupport(this.selectedSupportId).subscribe(data => {
        this.games = data;
        this.cdr.detectChanges();
      });
    } else {
      this.games = [];
    }
  }

  onSubmit(): void {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      this.errorMessage = "Erreur: Utilisateur non identifié. Veuillez vous reconnecter.";
      return;
    }

    if (this.session.gameId === 0 || this.session.temps < 0) {
      this.errorMessage = "Veuillez sélectionner un jeu et un temps valide.";
      return;
    }

    this.sessionService.createSession(userId, this.session).subscribe({
      next: () => {
        this.successMessage = "Session enregistrée !";
        this.errorMessage = '';
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = "Erreur lors de l'enregistrement.";
        this.cdr.detectChanges();
      }
    });
  }
}
