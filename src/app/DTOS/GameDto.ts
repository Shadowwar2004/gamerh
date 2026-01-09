export interface GameCreateDto {
  nom: string;
  tempsEstimer: number;
  supportId: number;
}

export interface GameReadDto {
  id: number;
  nom: string;
  tempsEstimer: number;
  supportId: number;
  supportNom?: string; // Optionnel car peut être null si le support a été supprimé
}
