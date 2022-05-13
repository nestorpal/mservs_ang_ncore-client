import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';

@Component({
  selector: 'app-menu-lista',
  templateUrl: './menu-lista.component.html',
  styleUrls: ['./menu-lista.component.css']
})
export class MenuListaComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter<void>();
  estadoUsuario: boolean;
  usuarioSubscripcion: Subscription;

  constructor(private seguridadServ: SeguridadService) { }

  ngOnInit(): void {
    this.usuarioSubscripcion = this.seguridadServ.seguridadCambio.subscribe((status) => {
      this.estadoUsuario = status;
    });
  }

  onCerrarMenu() {
    this.menuToggle.emit();
  }

  terminarSesionMenu() {
    this.onCerrarMenu();
    this.seguridadServ.logoff();
  }

  ngOnDestroy(): void {
    this.usuarioSubscripcion.unsubscribe();
  }
}
