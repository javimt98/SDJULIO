import { Injectable } from '@angular/core';


import {LoginI} from '../modelos/login.interface';
import {ResponseI} from '../modelos/response.interface'
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListaVehiculosI} from '../modelos/listavehiculos.interface'
import {ListaHotelesI} from '../modelos/listahoteles.interface'
import {ListaVuelosI} from '../modelos/listavuelos.interface'
import {UsuarioI} from '../modelos/usuario.interface'
import{TokenI} from '../modelos/token.interface'
import{ReservaI} from '../modelos/reserva.interface'

@Injectable({
  providedIn: 'root'
})
export class AgenciaService 
{
  constructor(private http:HttpClient) { }


  login(form:LoginI):Observable<ResponseI>
  {

    let email = form.usuario;
    let password = form.password;

    let url = "https://localhost:3008/api/signin/" + email + "/" + password;

    let direccion = url;
    return this.http.post<ResponseI>(direccion, form);
  }


  registro(form:UsuarioI):Observable<TokenI>
  {

    console.log("holaaa")
    //en el form van los parametros (email, displayname, password)
    let url = "https://localhost:3008/api/signup";

    let direccion = url;
    return this.http.post<TokenI>(direccion, form);
  }


//GETTERS TODA LA INFO

  getAllVehicles():Observable<ListaVehiculosI[]>
  {

    let url = "https://localhost:3008/api/allvehicles";


    return this.http.get<ListaVehiculosI[]>(url);
  }




  getAllHotels():Observable<ListaHotelesI[]>
  {

    let url = "https://localhost:3008/api/allhotels";


    return this.http.get<ListaHotelesI[]>(url);
  }



  getAllFlights():Observable<ListaVuelosI[]>
  {

    let url = "https://localhost:3008/api/allflights";


    return this.http.get<ListaVuelosI[]>(url);
  }



  getOffersVehicles(fechas: String):Observable<ListaVehiculosI[]>
  {

    var token = localStorage.getItem('token')
    //token = "añkhdsgnpq"

    let url = "https://localhost:3008/api/ofertasvehiculos/" + fechas;

    let header = new HttpHeaders({'Authorization': `Bearer ${token}`});

    const options = 
    {
      headers: header
    };

    return this.http.get<ListaVehiculosI[]>(url, options);
  }



  getOffersHotels(fechas: String):Observable<ListaHotelesI[]>
  {
    var token = localStorage.getItem('token')
    //token = "añkhdsgnpq"
    let header = new HttpHeaders({'Authorization': `Bearer ${token}`});
    const options = 
    {
      headers: header
    };

    let url = "https://localhost:3008/api/ofertashoteles/" + fechas;


    return this.http.get<ListaHotelesI[]>(url, options);
  }


  getOffersFlights(fechas: String):Observable<ListaVuelosI[]>
  {
    var token = localStorage.getItem('token')
    //token = "añkhdsgnpq"
    let header = new HttpHeaders({'Authorization': `Bearer ${token}`});
    const options = 
    {
      headers: header
    };

    let url = "https://localhost:3008/api/ofertasvuelos/" + fechas;


    return this.http.get<ListaVuelosI[]>(url, options);
  }



  reservarVehiculo(vehicleid: String, fechas:String):Observable<ReservaI[]>
  {
    let url = "https://localhost:3008/api/transindvehiculo/" + vehicleid + "/" + fechas;

    return this.http.get<ReservaI[]>(url);
  }

  reservarHotel(hotelid: String, fechas:String):Observable<ReservaI[]>
  {
    let url = "https://localhost:3008/api/transindhotel/" + hotelid + "/" + fechas;

    return this.http.get<ReservaI[]>(url);
  }

  reservarFligth(flightid: String, fechas:String):Observable<ReservaI[]>
  {
    let url = "https://localhost:3008/api/transindvuelo/" + flightid + "/" + fechas;

    return this.http.get<ReservaI[]>(url);
  }



  reservarPack(vehicleid: String, hotelid: String, flightid: String, fechas:String):Observable<ReservaI[]>
  {
    let url = "https://localhost:3008/api/transmult/" + vehicleid + "/" + hotelid + "/" + flightid + "/" + fechas;

    return this.http.get<ReservaI[]>(url);
  }



  cancelarReserva(idreserva: String):Observable<ReservaI[]>
  {
    var token = localStorage.getItem('token')
    //token = "añkhdsgnpq"
    let header = new HttpHeaders({'Authorization': `Bearer ${token}`});
    const options = 
    {
      headers: header
    };

    let url = "https://localhost:3008/api/canceltrans/" + idreserva;

    return this.http.get<ReservaI[]>(url, options);
  }

  infoReserva(idreserva: String):Observable<ReservaI[]>
  {
    var token = localStorage.getItem('token')
    //token = "añkhdsgnpq"
    let header = new HttpHeaders({'Authorization': `Bearer ${token}`});
    const options = 
    {
      headers: header
    };

    let url = "https://localhost:3008/api/transinfo/" + idreserva;

    return this.http.get<ReservaI[]>(url, options);
  }
}
