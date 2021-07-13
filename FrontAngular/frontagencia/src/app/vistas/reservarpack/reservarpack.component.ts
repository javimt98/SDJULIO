import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ListaHotelesI } from 'src/app/modelos/listahoteles.interface';
import { ListaVehiculosI } from 'src/app/modelos/listavehiculos.interface';
import { ListaVuelosI } from 'src/app/modelos/listavuelos.interface';
import { ReservaI } from 'src/app/modelos/reserva.interface';
import { AgenciaService } from 'src/app/servicios/agencia.service';
import {PackI} from 'src/app/modelos/pack.interface'


@Component({
  selector: 'app-reservarpack',
  templateUrl: './reservarpack.component.html',
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
export class ReservarpackComponent implements OnInit {



  packForm = new FormGroup({
    idvehiculo: new FormControl('', Validators.required),
    idhotel: new FormControl('', Validators.required),
    idvuelo: new FormControl('', Validators.required)
  })


  ngOnInit(): void {
  }


  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  constructor(calendar: NgbCalendar, private api: AgenciaService, private router:Router) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
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


  reservas:ReservaI[] = [];
  errorStatus:boolean = false;
  errorMsj: any = "";


  vehiculos:ListaVehiculosI[] = [];
  hoteles:ListaHotelesI[] = [];
  vuelos: ListaVuelosI[] = [];

  async montarinfo()
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

    var token = localStorage.getItem('token')

    if(token != null)
    { 
      this.api.getOffersVehicles(fech).subscribe(data =>
      {
        console.log(data);
        this.vehiculos = data;
      },
      error =>
      {
        console.log('TOKEN INVALIDO NO TIENES ACCESO')
        this.errorStatus = true;
        this.errorMsj = "TOKEN INVALIDO NO TIENES ACCESO"
      });

      this.api.getOffersHotels(fech).subscribe(data =>
      {
        console.log(data);
        this.hoteles = data;
      },
      error =>
      {
        console.log('TOKEN INVALIDO NO TIENES ACCESO')
        this.errorStatus = true;
        this.errorMsj = "TOKEN INVALIDO NO TIENES ACCESO"
      });


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



  public saveidvehiculo:boolean | undefined;

  public onSaveVehicleChanged(value:boolean){
      this.saveidvehiculo = value;
  }


  redirigeareserva(form: PackI)
  {

    console.log(form);
    
    var añoini = this.fromDate.year.toString();
    var añofin = this.toDate?.year.toString();

    var mesini = this.fromDate.month.toString();
    var mesfin = this.toDate?.month.toString();

    var diaini = this.fromDate.day.toString();
    var diafin = this.toDate?.day.toString();


    var fechaini = añoini + "-" + mesini + "-" + diaini;
    var fechafin = añofin + "-" + mesfin + "-" + diafin;

    var fech = fechaini + "/" + fechafin;

    let vehiculoid = form.idvehiculo
    let hotelid = form.idhotel
    let flightid = form.idvuelo

    console.log(vehiculoid)
    console.log(hotelid)
    console.log(flightid)


    this.api.reservarPack(vehiculoid, hotelid, flightid, fech).subscribe(data =>
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
