import { Auteur } from './auteur';

export interface AuteurFormData {
  isUpdateMode: boolean;
  auteurToUpdate?: Auteur;
  idToCreate?: number;
}