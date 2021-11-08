import { Component, OnInit, OnDestroy } from '@angular/core';
import { LibrosService } from '../services/libros.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-libros',
  templateUrl: 'libros.component.html',
})
export class LibrosComponent implements OnInit, OnDestroy {
  libros = [];
  private libroSubscription: Subscription;

  constructor(private librosService: LibrosService) {

  }

  ngOnInit(): void {
    this.libros = this.librosService.obtenLibros();
    this.libroSubscription = this.librosService.librosSubject.subscribe(() => {
      this.libros = this.librosService.obtenLibros();
    });
  }

  ngOnDestroy(): void {
    this.libroSubscription.unsubscribe();
  }

  eliminaLibro(libro: string) {
    this.librosService.eliminaLibro(libro);
  }

  guardaLibro(f) {
    if (f.valid) {
      this.librosService.agregaLibro(f.value.nombreLibro);
      this.libros = this.librosService.obtenLibros();
    }
  }
}
