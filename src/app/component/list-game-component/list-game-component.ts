import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GameService } from '../../service/game-service';
import { SupportReadDto } from '../../DTOS/SupportDto';
import { GameReadDto } from '../../DTOS/GameDto';
import { FormsModule } from '@angular/forms';

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
  hasSearched: boolean = false;

  // 2. INJECTION du ChangeDetectorRef
  constructor(
    private gameService: GameService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // 1. Charger la liste des supports
    this.gameService.getSupports().subscribe({
      next: (data) => {
        this.supports = data;
        // 3. FORCER L'AFFICHAGE DU MENU DÉROULANT
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur chargement supports', err)
    });
  }

  // Appelé quand l'utilisateur change la valeur du select
  onSupportChange(): void {
    if (!this.selectedSupportId) return;

    this.isLoading = true;
    this.hasSearched = true;
    this.games = [];

    this.cdr.detectChanges();

    this.gameService.getGamesBySupport(this.selectedSupportId).subscribe({
      next: (data) => {
        this.games = data;
        this.isLoading = false;
        // 4. FORCER L'AFFICHAGE DES JEUX
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur chargement jeux', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
