import { Books } from './books.model';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaginationBook } from './pagination-book.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  baseUrl = environment.baseUrl;

  private booksLista: Books[] = [];
  bookSubject = new Subject();

  bookPagination: PaginationBook;
  bookPaginationSubject = new Subject<PaginationBook>();

  constructor(private http: HttpClient) {}

  obtenerLibros(
    regsPorPagina: number,
    pagActual: number,
    sort: string,
    sortDirection: string,
    filterValue: any
  ) {
    const request = {
      pageSize: regsPorPagina,
      page: pagActual,
      sort,
      sortDirection,
      filterValue
    };

    this.http.post<PaginationBook>(`${this.baseUrl}libro/pagination`, request)
      .subscribe(response => {
        this.bookPagination = response;
        this.bookPaginationSubject.next(this.bookPagination);
      });
  }

  obtenerActualListener(): any {
    return this.bookPaginationSubject.asObservable();
  }

  guardarLibro(book: Books) {
    this.http.post(`${this.baseUrl}libro`, book)
      .subscribe((response) => {
        this.bookSubject.next();
      });
  }

  guardarLibroListener() {
    return this.bookSubject.asObservable();
  }
}
