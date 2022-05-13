import { Subject } from 'rxjs';

import { Usuario } from './usuario.model';
import { LoginData } from './login-data.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  private token: string;
  baseUrl = environment.baseUrl;

  seguridadCambio = new Subject<boolean>();
  private usuario: Usuario;

  cargarUsuario(): void {
    const tokenBrowser = localStorage.getItem('token');
    if (!tokenBrowser) {
      return;
    }

    this.token = tokenBrowser;
    this.seguridadCambio.next(true);

    this.http.get<Usuario>(`${this.baseUrl}usuario`)
    .subscribe((response) => {
      this.token = response.token;

      this.usuario = {
        email: response.email,
        nombre: response.nombre,
        apellido: response.apellido,
        token: response.token,
        password: '',
        username: response.username,
        usuarioId: response.usuarioId
      };

      this.seguridadCambio.next(true);
      localStorage.setItem('token', response.token);
    });
  }

  obtenerToken(): string {
    return this.token;
  }

  constructor(
    private router: Router,
    private http: HttpClient) {

  }

  registrarUsuario(usr: Usuario) {
    // this.usuario = {
    //   usuarioId: Math.round(Math.random() * 10000).toString(),
    //   ...usr,
    // };

    // this.seguridadCambio.next(true);
    // this.router.navigate(['/']);

    this.http.post<Usuario>(`${this.baseUrl}usuario/registrar`, usr)
    .subscribe((response) => {
      this.token = response.token;

      this.usuario = {
        email: response.email,
        nombre: response.nombre,
        apellido: response.apellido,
        token: response.token,
        password: '',
        username: response.username,
        usuarioId: response.usuarioId
      };

      this.seguridadCambio.next(true);
      localStorage.setItem('token', response.token);
      this.router.navigate(['/']);
    });
  }

  login(loginData: LoginData): void {
    this.http.post<Usuario>(`${this.baseUrl}usuario/login`, loginData)
    .subscribe((response) => {
      this.token = response.token;

      this.usuario = {
        email: response.email,
        nombre: response.nombre,
        apellido: response.apellido,
        token: response.token,
        password: '',
        username: response.username,
        usuarioId: response.usuarioId
      };

      this.seguridadCambio.next(true);
      localStorage.setItem('token', response.token);
      this.router.navigate(['/']);
    });
  }

  logoff() {
    this.usuario = null;

    this.seguridadCambio.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  obtenerUsuario() {
    return { ...this.usuario };
  }

  onSesion() {
    return this.token != null;
  }
}
