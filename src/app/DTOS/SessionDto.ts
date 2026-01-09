export interface SessionCreateDto {
  gameId: number;
  temps: number;
  dateRecord: string;
}

export interface SessionReadDto {
  id: number;                // "id" minuscule
  gameId: number;            // "gameId" minuscule
  gameNom: string;           // "gameNom" minuscule
  gameTempsEstimer: number;  // "gameTempsEstimer" minuscule
  temps: number;             // "temps" minuscule
  dateRecord: string;        // "dateRecord" minuscule
  isCompleted?: boolean;
}
