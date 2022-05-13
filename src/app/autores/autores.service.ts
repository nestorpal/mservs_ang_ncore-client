import { Injectable } from '@angular/core';
import { Autor } from './autor.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root', // accessible level
})
export class AutoresService {
  baseUrl: string = environment.baseUrl;
  private autoresLista: Autor[] = [];
  private autoresSubject = new Subject<Autor[]>();

  constructor(private http: HttpClient) {

  }

  obtenerAutores() {
    this.http.get<Autor[]>(`${this.baseUrl}autor`)
      .subscribe(data => {
        this.autoresLista = data;
        this.autoresSubject.next([...this.autoresLista]);
      });
  }

  obtenerActualListener() {
    return this.autoresSubject.asObservable();
  }
}
