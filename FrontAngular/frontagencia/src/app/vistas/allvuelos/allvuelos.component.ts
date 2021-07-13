import { Component, OnInit } from '@angular/core';
import {AgenciaService} from '../../servicios/agencia.service';
import {Router} from '@angular/router';
import{ListaVuelosI} from '../../modelos/listavuelos.interface'

@Component({
  selector: 'app-allvuelos',
  templateUrl: './allvuelos.component.html',
  styleUrls: ['./allvuelos.component.css']
})
export class AllvuelosComponent implements OnInit {

  constructor(private api: AgenciaService, private router:Router) { }

  vuelos:ListaVuelosI[] = [];

  ngOnInit(): void {
    this.api.getAllFlights().subscribe(data =>
      {
        console.log(data);
        this.vuelos = data;
      })
  }

}
