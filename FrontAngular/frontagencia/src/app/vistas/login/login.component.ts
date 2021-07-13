import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators} from '@angular/forms'
import {AgenciaService} from '../../servicios/agencia.service'
import {LoginI} from '../../modelos/login.interface'

import { Router } from '@angular/router'
import{ResponseI} from'../../modelos/response.interface'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private api: AgenciaService, private router:Router) 
  {

  }

  //variables de error si no se encuentra el usuario
  errorStatus:boolean = false;
  errorMsj: any = "";


  ngOnInit(): void {
    this.revisarTokenLocalStorage();
  }


  revisarTokenLocalStorage()
  {
    if(localStorage.getItem('token'))
    {
      this.router.navigate(['dashboard']);
    }
  }

  onLogin(form: LoginI)
  {
    this.api.login(form).subscribe(data =>
    {
      let dataResponse: ResponseI = data;
      if(dataResponse.token != null)
      {
        //si el api envia el token y todo ha ido bien almaceno el token
        localStorage.setItem("token", dataResponse.token);

        //y redirecciono al dashboard
        this.router.navigate(['dashboard']);
      }
      console.log(data);
    },
    error =>
    {
        console.log('Ha llegado un error desde la api!!!!! No se ha encontrado el usuario', error);
        this.errorStatus = true;
        this.errorMsj = "Usuario incorrecto";
    });
  }

}
