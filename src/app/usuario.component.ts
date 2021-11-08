import { Component } from '@angular/core';

@Component({
  selector: '<app-usuario>',
  templateUrl: './usuario.component.html'
})

export class UsuarioComponent {
  usuarios = ['Nestor', 'Espinas', 'Piojo'];
  usuarioNombre = '';
  visible = false;

  constructor() {
    setTimeout(() => {
      this.visible = true;
    }, 3000);
  }

  onAgregaUsuario() {
    this.usuarios.push(this.usuarioNombre);
  }
}
