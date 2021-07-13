import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';

import {AgenciaService} from '../../servicios/agencia.service';
import {Router} from '@angular/router';

import{ListaVehiculosI} from '../../modelos/listavehiculos.interface'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  


  constructor() { }

  

  ngOnInit(): void {
  
  }
}


