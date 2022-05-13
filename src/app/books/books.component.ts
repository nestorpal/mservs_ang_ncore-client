import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookNuevoComponent } from './book-nuevo.component';
import { Books } from './books.model';
import { BooksService } from './books.service';
import { Subscription } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import { PaginationBook } from './pagination-book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {
  bookData: Books[] = [];
  desplegarColumnas = ['titulo', 'descripcion', 'autor', 'precio'];
  dataSource = new MatTableDataSource<Books>();

  @ViewChild(MatSort) ordenamiento: MatSort;
  @ViewChild(MatPaginator) paginacion: MatPaginator;

  private bookSubscription: Subscription;
  private bookPaginationSubscription: Subscription;

  totalLibros = 0;
  librosPorPagina = 2;
  paginaCombo = [2, 4, 8, 10];
  paginaActual = 1;
  sort = 'titulo';
  sortDirection = 'asc';
  filterValue = null;

  timeout: any = null;

  constructor(private booksServ: BooksService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.booksServ.obtenerLibros(
      this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );

    this.bookSubscription = this.booksServ.obtenerActualListener()
      .subscribe((response: PaginationBook) => {
        this.dataSource = new MatTableDataSource<Books>(response.data);
        this.totalLibros = response.totalRows;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }

  filtrarTabla(event: any) {
    clearTimeout(this.timeout);
    const $this = this;

    this.timeout = setTimeout(() => {
      if (event.keyCode != 13) {
        const filterValueLocal = {
          propiedad: 'titulo',
          valor: event.target.value
        };

        $this.filterValue = filterValueLocal;

        $this.booksServ.obtenerLibros(
          $this.librosPorPagina,
          $this.paginaActual,
          $this.sort,
          $this.sortDirection,
          $this.filterValue
        );
      }
    }, 1000);
  }

  mostrarDialogo() {
    const dialogRef = this.dialog.open(BookNuevoComponent, {
      width: '550px',
    });

    dialogRef.afterClosed()
      .subscribe(() => {
        this.booksServ.obtenerLibros(
          this.librosPorPagina,
          this.paginaActual,
          this.sort,
          this.sortDirection,
          this.filterValue
        );
      });
  }

  eventoPaginador(event: PageEvent) {
    this.librosPorPagina = event.pageSize;
    this.paginaActual = event.pageIndex + 1;
    this.booksServ.obtenerLibros(
      this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
  }

  ordenarColumna(event) {
    this.sort = event.active;
    this.sortDirection = event.direction;

    this.booksServ.obtenerLibros(
      this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
  }

  ngOnDestroy(): void {
    this.bookSubscription.unsubscribe();
  }
}
