import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Autor } from './autor.model';
import { AutoresService } from './autores.service';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css']
})
export class AutoresComponent implements OnInit, OnDestroy {
  private autorSubscription: Subscription;
  desplegarColumnas = ['nombre', 'apellido', 'gradoAcademico'];
  dataSource = new MatTableDataSource<Autor>();

  constructor(private autorServ: AutoresService) {

  }

  ngOnInit(): void {
    // this.dataSource.data = this.autorServ.obtenerAutores();

    this.autorServ.obtenerAutores();
    this.autorSubscription = this.autorServ.obtenerActualListener()
      .subscribe((autores: Autor[]) => {
        this.dataSource.data = autores;
      });
  }

  ngOnDestroy(): void {
      this.autorSubscription.unsubscribe();
  }
}
