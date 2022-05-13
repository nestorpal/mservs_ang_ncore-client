import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { Autor } from '../autores/autor.model';
import { AutoresService } from '../autores/autores.service';
import { BooksService } from './books.service';

@Component({
  selector: 'app-book-nuevo',
  templateUrl: 'book-nuevo.component.html',
})
export class BookNuevoComponent implements OnInit, OnDestroy {
  selectAutor: string;
  selectAutorLabel: string;
  fechaPublicacion: string;

  @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;

  autores: Autor[] = [];
  autorSubscription: Subscription;

  constructor(
    private bookServ: BooksService
    , private dialogRef: MatDialog
    , private autorServ: AutoresService) {}

  ngOnInit(): void {
      this.autorServ.obtenerAutores();
      this.autorSubscription = this.autorServ.obtenerActualListener()
        .subscribe((response: Autor[]) => {
          this.autores = response;
        });
  }

  autorSelected(event: MatSelectChange) {
    this.selectAutorLabel = (event.source.selected as MatOption).viewValue;
  }

  guardarLibro(form: NgForm) {
    if (form.valid) {
      const autorRequest = {
        id: this.selectAutor,
        nombreCompleto: this.selectAutorLabel
      }

      const libroRequest = {
        id: null,
        descripcion: form.value.descripcion,
        titulo: form.value.titulo,
        autor: autorRequest,
        precio: parseInt(form.value.precio),
        fechaPublicacion: new Date(this.fechaPublicacion)
      }

      this.bookServ.guardarLibro(libroRequest);
      this.autorSubscription = this.bookServ.guardarLibroListener()
        .subscribe(() => {
          this.dialogRef.closeAll();
        });
    }
  }

  ngOnDestroy(): void {
      this.autorSubscription.unsubscribe();
  }
}
