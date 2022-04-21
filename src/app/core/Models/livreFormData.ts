import { Livre } from './livre';

export interface LivreFormData {
  isUpdateMode: boolean;
  livreToUpdate?: Livre;
  idToCreate?: number;
}