import {Component, OnInit} from '@angular/core';
import {GameService} from '../../service/game-service';
import {Router} from '@angular/router';
import {SupportReadDto} from '../../DTOS/SupportDto';
import {GameCreateDto} from '../../DTOS/GameDto';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-game-component',
  imports: [
    FormsModule
  ],
  templateUrl: './create-game-component.html',
  styleUrl: './create-game-component.css',
})
export class CreateGameComponent implements OnInit {

  game: GameCreateDto = {
    nom: '',
    tempsEstimer: 0,
    supportId: 0
  };

  supports: SupportReadDto[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.gameService.getSupports().subscribe({
      next: (data) => {
        this.supports = data;
        if (this.supports.length > 0) {
          this.game.supportId = this.supports[0].id;
        }
      },
      error: (err) => console.error('Erreur chargement supports', err)
    });
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.game.nom || this.game.tempsEstimer < 0) {
      this.errorMessage = "Veuillez vérifier les champs.";
      return;
    }

    this.gameService.create(this.game).subscribe({
      next: () => {
        this.successMessage = "Jeu créé avec succès !";
        this.game.nom = '';
        this.game.tempsEstimer = 0;
      },
      error: (err) => {
        if (err.status === 409) {
          this.errorMessage = "Ce jeu existe déjà sur ce support.";
        } else {
          this.errorMessage = "Une erreur est survenue lors de la création.";
        }
      }
    });
  }
}
