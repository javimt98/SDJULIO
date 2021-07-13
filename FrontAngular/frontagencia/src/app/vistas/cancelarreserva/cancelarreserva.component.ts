import { Component, OnInit } from '@angular/core';
import{ReservaI} from '../../modelos/reserva.interface'
import {AgenciaService} from '../../servicios/agencia.service';
import {Router} from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {IDReservaI} from '../../modelos/idreserva.interface'

@Component({
  selector: 'app-cancelarreserva',
  templateUrl: './cancelarreserva.component.html',
  styleUrls: ['./cancelarreserva.component.css']
})
export class CancelarreservaComponent implements OnInit {



    cancelForm = new FormGroup({
    idreserva: new FormControl('', Validators.required)
  })


  constructor(private api: AgenciaService, private router:Router) { }

  ngOnInit(): void {
  }




  reservas:ReservaI[] = [];
  errorStatus:boolean = false;
  errorMsj: any = "";


  cancel(form:IDReservaI)
  {

    let idreserva = form.idreserva
    
    console.log(idreserva)

    const token = localStorage.getItem('token')

    if(token != null)
    {
      this.api.cancelarReserva(idreserva).subscribe(data =>
      {
        this.reservas = data;
      },
      error =>
      {
        console.log('Error desde la api no ha sido posible cancelar la reserva ')
        this.errorStatus = true;
        //CUANDO LA API DEVUELVE STATUS 500(ERROR) NO ENVIA EL BODY, EN POSTMAN SI PUEDO VER EL TIPO DE ERROR QUE HA OCURRIDO
        this.errorMsj = "Error, no se ha podido cancelar la reserva"
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
