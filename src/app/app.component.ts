import { Component, OnInit } from '@angular/core';
import { SeguridadService } from './seguridad/seguridad.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Client';
  abrirMenu = false;

  constructor(private seguridadSrv: SeguridadService) {}

  ngOnInit(): void {
    this.seguridadSrv.cargarUsuario();
  }
}
