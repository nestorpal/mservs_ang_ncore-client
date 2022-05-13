export interface Books {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  fechaPublicacion?: Date; // nullable
  autor: {
    id: string;
    nombreCompleto: string;
  };
}
