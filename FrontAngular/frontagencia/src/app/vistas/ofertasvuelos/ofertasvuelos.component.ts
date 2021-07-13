import { Component, OnInit } from '@angular/core';
import {AgenciaService} from '../../servicios/agencia.service';
import {Router} from '@angular/router';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

import { ListaVuelosI} from '../../modelos/listavuelos.interface'
import{ReservaI} from '../../modelos/reserva.interface'

@Component({
  selector: 'app-ofertasvuelos',
  templateUrl: './ofertasvuelos.component.html',
  styles: [`
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.focused {
      background-color: #e6e6e6;
    }
    .custom-day.range, .custom-day:hover {
      background-color: rgb(2, 117, 216);
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
  `]
})
export class OfertasvuelosComponent implements OnInit {

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  constructor(calendar: NgbCalendar, private api: AgenciaService, private router:Router) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
  }


  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }


  vuelos:ListaVuelosI[] = [];

  montarinfo()
  {

    console.log();

    var añoini = this.fromDate.year.toString();
    var añofin = this.toDate?.year.toString();

    var mesini = this.fromDate.month.toString();
    var mesfin = this.toDate?.month.toString();

    var diaini = this.fromDate.day.toString();
    var diafin = this.toDate?.day.toString();


    var fechaini = añoini + "-" + mesini + "-" + diaini;
    var fechafin = añofin + "-" + mesfin + "-" + diafin;

    var fech = fechaini + "/" + fechafin;


    const token = localStorage.getItem('token')


    if(token != null)
    {  
      this.api.getOffersFlights(fech).subscribe(data =>
        {
          console.log(data);
          this.vuelos = data;
        },
        error =>
        {
          console.log('TOKEN INVALIDO NO TIENES ACCESO')
          this.errorStatus = true;
          this.errorMsj = "TOKEN INVALIDO NO TIENES ACCESO"
        });
    }
  
    else
    {
      console.log("NO HAY TOKEN ALMACENADO no tienes acceso")
      console.log(token)
      this.router.navigate(['/login'])
    }
  }



  reservas:ReservaI[] = [];
  errorStatus:boolean = false;
  errorMsj: any = "";
  
  redirigeareserva(flightid:String)
  {
    
    var añoini = this.fromDate.year.toString();
    var añofin = this.toDate?.year.toString();

    var mesini = this.fromDate.month.toString();
    var mesfin = this.toDate?.month.toString();

    var diaini = this.fromDate.day.toString();
    var diafin = this.toDate?.day.toString();


    var fechaini = añoini + "-" + mesini + "-" + diaini;
    var fechafin = añofin + "-" + mesfin + "-" + diafin;

    var fech = fechaini + "/" + fechafin;


    this.api.reservarFligth(flightid, fech).subscribe(data =>
    {
      this.reservas = data;
      console.log(data);
    },
    error =>
    {
      console.log('Error desde la api no ha sido posible efectuar la reserva ')
      this.errorStatus = true;
      //CUANDO LA API DEVUELVE STATUS 500(ERROR) NO ENVIA EL BODY, EN POSTMAN SI PUEDO VER EL TIPO DE ERROR QUE HA OCURRIDO
      //(NO SALDO) O (YA ESTA RESERVADO EL VEHICULO) POR LO QUE AQUI SIMPLEMENTE MUESTRO UN MENSAJE GENERICO
      this.errorMsj = "Error, no se ha podido efectuar la reserva"
    });
  }



}
