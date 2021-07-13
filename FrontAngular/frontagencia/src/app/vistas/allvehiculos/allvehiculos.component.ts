import { Component, OnInit } from '@angular/core';
import {AgenciaService} from '../../servicios/agencia.service';
import {Router} from '@angular/router';

import{ListaVehiculosI} from '../../modelos/listavehiculos.interface'


@Component({
  selector: 'app-allvehiculos',
  templateUrl: './allvehiculos.component.html',
  styleUrls: ['./allvehiculos.component.css']
})
export class AllvehiculosComponent implements OnInit {

  constructor(private api: AgenciaService, private router:Router) { }


  vehiculos:ListaVehiculosI[] = [];

  ngOnInit(): void {
    this.api.getAllVehicles().subscribe(data =>
    {
      console.log(data);
      this.vehiculos = data;
    })
  }
}
