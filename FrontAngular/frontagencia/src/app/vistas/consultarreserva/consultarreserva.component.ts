import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDReservaI } from 'src/app/modelos/idreserva.interface';
import { ReservaI } from 'src/app/modelos/reserva.interface';
import { AgenciaService } from 'src/app/servicios/agencia.service';

@Component({
  selector: 'app-consultarreserva',
  templateUrl: './consultarreserva.component.html',
  styleUrls: ['./consultarreserva.component.css']
})
export class ConsultarreservaComponent implements OnInit {

  searchForm = new FormGroup({
    idreserva: new FormControl('', Validators.required)
  })

  constructor(private api: AgenciaService, private router:Router) { }

  ngOnInit(): void {
  }


  reservas:ReservaI[] = [];
  errorStatus:boolean = false;
  errorMsj: any = "";

  search(form:IDReservaI)
  {  
    let idreserva = form.idreserva
    
    const token = localStorage.getItem('token')

    if(token != null)
    {
      this.api.infoReserva(idreserva).subscribe(data =>
      {
        this.reservas = data;
      },
      error =>
      {
        console.log('Error desde la api no ha sido posible obtener la reserva ')
        this.errorStatus = true;
        //CUANDO LA API DEVUELVE STATUS 500(ERROR) NO ENVIA EL BODY, EN POSTMAN SI PUEDO VER EL TIPO DE ERROR QUE HA OCURRIDO
        this.errorMsj = "Error, no se ha podido obtener la reserva"
      });
    }
    else
    {
      console.log("NO HAY TOKEN ALMACENADO no tienes acceso")
      console.log(token)
      this.router.navigate(['/login'])
    }
  }
}
