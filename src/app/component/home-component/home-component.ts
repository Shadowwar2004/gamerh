import { Component } from '@angular/core';
import {AuthService} from '../../service/auth-service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [
    RouterLink
  ],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        // Redirection vers le login après déconnexion
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error("Erreur lors de la déconnexion", err);
        // On redirige quand même pour ne pas bloquer l'utilisateur
        this.router.navigate(['/login']);
      }
    });
  }

}
