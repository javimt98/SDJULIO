import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import {AgenciaService} from '../../servicios/agencia.service'

import {UsuarioI} from '../../modelos/usuario.interface'
import{TokenI} from '../../modelos/token.interface'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private api: AgenciaService, private router:Router) { }


  registroForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required)
  })


  ngOnInit(): void {
  }

  errorStatus:boolean = false;
  errorMsj: any = "";

  registrarse(form: UsuarioI)
  {

    this.api.registro(form).subscribe(data =>
    {
      let dataResponse = data;
      
      if(dataResponse.token != null)
      {
        //si el api envia el token y todo ha ido bien almaceno el token
        localStorage.setItem("token", dataResponse.token);

        //y redirecciono al dashboard
        this.router.navigate(['dashboard']);
      }
    },
    error =>
    {
        console.log('Ha llegado un error desde la api!!!!! No se ha podido registrar al usuario', error);
        this.errorStatus = true;
        this.errorMsj = "Error inesperado";
    });
  }



}
