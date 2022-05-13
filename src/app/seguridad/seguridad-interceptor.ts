import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SeguridadService } from "./seguridad.service";

@Injectable()
export class SeguridadInterceptor implements HttpInterceptor {

  constructor(private seguridadSrv: SeguridadService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenSeguridad = this.seguridadSrv.obtenerToken();

    const newRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${tokenSeguridad}`)
    });

    return next.handle(newRequest);
  }

}
