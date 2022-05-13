import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from './seguridad.service';

@Injectable()
export class SeguridadRouter implements CanActivate {
  constructor(
    private seguridadServ: SeguridadService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.seguridadServ.onSesion()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
