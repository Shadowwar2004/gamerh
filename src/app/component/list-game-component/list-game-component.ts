import {Component, OnInit} from '@angular/core';
import {GameService} from '../../service/game-service';
import {SupportReadDto} from '../../DTOS/SupportDto';
import {GameReadDto} from '../../DTOS/GameDto';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-list-game-component',
  imports: [
    FormsModule
  ],
  templateUrl: './list-game-component.html',
  styleUrl: './list-game-component.css',
})
export class ListGameComponent implements OnInit {

  supports: SupportReadDto[] = [];
  games: GameReadDto[] = [];

  selectedSupportId: number = 0;
  isLoading: boolean = false;
  hasSearched: boolean = false; // Pour savoir si on doit afficher "Aucun jeu trouvé"

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    // 1. Charger la liste des supports pour le menu déroulant
    this.gameService.getSupports().subscribe({
      next: (data) => {
        this.supports = data;
        // Optionnel : Sélectionner automatiquement le premier et charger ses jeux
        /* if (this.supports.length > 0) {
           this.selectedSupportId = this.supports[0].id;
           this.onSupportChange();
        } */
      },
      error: (err) => console.error('Erreur chargement supports', err)
    });
  }

  // Appelé quand l'utilisateur change la valeur du select
  onSupportChange(): void {
    if (!this.selectedSupportId) return;

    this.isLoading = true;
    this.hasSearched = true;
    this.games = []; // Vide la liste précédente

    this.gameService.getGamesBySupport(this.selectedSupportId).subscribe({
      next: (data) => {
        this.games = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement jeux', err);
        this.isLoading = false;
      }
    });
  }
}
