import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  constructor(private seguridadServ: SeguridadService) { }

  ngOnInit(): void {
  }

  registrarUsuario(form: NgForm) {
    console.log(form.value.email, form.value.password);
    this.seguridadServ.registrarUsuario({
      nombre: form.value.nombre,
      apellido: form.value.apellidos,
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
      usuarioId: '',
      token: ''
    });
  }

}
