import {Component, OnInit} from '@angular/core';
import {GameService} from '../../service/game-service';
import {SessionService} from '../../service/session-service';
import {SessionCreateDto} from '../../DTOS/SessionDto';
import {GameReadDto} from '../../DTOS/GameDto';
import {SupportReadDto} from '../../DTOS/SupportDto';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-session-component',
  imports: [
    FormsModule
  ],
  templateUrl: './create-session-component.html',
  styleUrl: './create-session-component.css',
})
export class CreateSessionComponent implements OnInit {

  supports: SupportReadDto[] = [];
  games: GameReadDto[] = [];

  selectedSupportId: number = 0;

  // Modèle du formulaire
  session: SessionCreateDto = {
    gameId: 0,
    temps: 0,
    dateRecord: new Date().toISOString().split('T')[0] // Date du jour par défaut (YYYY-MM-DD)
  };

  successMessage = '';
  errorMessage = '';

  constructor(private gameService: GameService, private sessionService: SessionService) {}

  ngOnInit(): void {
    // Charger les supports
    this.gameService.getSupports().subscribe(data => this.supports = data);
  }

  onSupportChange(): void {
    if (this.selectedSupportId) {
      this.gameService.getGamesBySupport(this.selectedSupportId).subscribe(data => this.games = data);
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
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = "Erreur lors de l'enregistrement.";
      }
    });
  }

}
