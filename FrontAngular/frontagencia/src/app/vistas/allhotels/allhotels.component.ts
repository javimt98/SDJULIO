import { Component, OnInit } from '@angular/core';
import {AgenciaService} from '../../servicios/agencia.service';
import {Router} from '@angular/router';
import{ListaHotelesI} from '../../modelos/listahoteles.interface'

@Component({
  selector: 'app-allhotels',
  templateUrl: './allhotels.component.html',
  styleUrls: ['./allhotels.component.css']
})
export class AllhotelsComponent implements OnInit {

  constructor(private api: AgenciaService, private router:Router) { }



  hotels:ListaHotelesI[] = [];

  ngOnInit(): void {
    this.api.getAllHotels().subscribe(data =>
      {
        console.log(data);
        this.hotels = data;
      })
  }

}
