import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { LibrosComponent } from './libros/libros.component';
import { LoginComponent } from './seguridad/login/login.component';
import { RegistrarComponent } from './seguridad/registrar/registrar.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'libros', component: LibrosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
