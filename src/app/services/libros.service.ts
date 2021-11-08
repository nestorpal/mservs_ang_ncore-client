import { Subject } from 'rxjs';

export class LibrosService {

  librosSubject = new Subject();

  private libros = ['Matemática 1', 'Algoritmos Básico', 'Álgebra Azanzado'];

  agregaLibro(nombreLibro: string) {
    this.libros.push(nombreLibro);
    this.librosSubject.next();
  }

  obtenLibros() {
    return [...this.libros];
  }

  eliminaLibro(nombreLibro: string) {
    this.libros = this.libros.filter(item => item !== nombreLibro);
    this.librosSubject.next();
  }
}
