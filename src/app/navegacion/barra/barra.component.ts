import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter<void>();
  estadoUsuario: boolean;
  usuarioSubscription: Subscription;

  constructor(private seguridadServ: SeguridadService) { }

  ngOnInit(): void {
    this.usuarioSubscription = this.seguridadServ.seguridadCambio.subscribe((status) => {
      this.estadoUsuario = status;
    })
  }

  onMenuToggleDispatch() {
    this.menuToggle.emit();
  }

  ngOnDestroy() {
       this.usuarioSubscription.unsubscribe();
  }

  terminarSesion() {
    this.seguridadServ.logoff();
  }
}
