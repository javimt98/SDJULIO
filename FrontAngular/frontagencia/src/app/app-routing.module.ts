import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//IMPORTAR COMPONENTES PARA MANEJAR LAS RUTAS
import{ LoginComponent } from './vistas/login/login.component';
import{ DashboardComponent } from './vistas/dashboard/dashboard.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import {AllvehiculosComponent} from './vistas/allvehiculos/allvehiculos.component';
import {AllhotelsComponent} from './vistas/allhotels/allhotels.component';
import {AllvuelosComponent} from './vistas/allvuelos/allvuelos.component';
import { OfertasVehiculosComponent } from './vistas/ofertasvehiculos/ofertasvehiculos.component';
import { OfertashotelesComponent } from './vistas/ofertashoteles/ofertashoteles.component';
import {OfertasvuelosComponent} from './vistas/ofertasvuelos/ofertasvuelos.component';
import {RegistroComponent} from './vistas/registro/registro.component'
import {CancelarreservaComponent} from './vistas/cancelarreserva/cancelarreserva.component'
import {ReservarpackComponent} from './vistas/reservarpack/reservarpack.component'
import {ConsultarreservaComponent} from './vistas/consultarreserva/consultarreserva.component'

const routes: Routes = 
[
  {path:'', redirectTo:'dashboard', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'header', component:HeaderComponent},
  {path:'footer', component:FooterComponent},
  {path:'allvehicles', component:AllvehiculosComponent},
  {path:'allhotels', component:AllhotelsComponent},
  {path:'allflights', component:AllvuelosComponent},
  {path:'ofertasvehiculos', component:OfertasVehiculosComponent},
  {path: 'ofertashoteles', component:OfertashotelesComponent},
  {path: 'ofertasvuelos', component:OfertasvuelosComponent},
  {path: 'registro', component:RegistroComponent},
  {path: 'cancelar', component:CancelarreservaComponent},
  {path: 'pack', component:ReservarpackComponent},
  {path: 'consultarreserva', component:ConsultarreservaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



//exportar routas

export const rutas = 
[
  LoginComponent,
  DashboardComponent,
  HeaderComponent,
  FooterComponent,
  AllvehiculosComponent,
  AllhotelsComponent,
  AllvuelosComponent,
  OfertasVehiculosComponent,
  OfertashotelesComponent,
  OfertasvuelosComponent,
  RegistroComponent,
  CancelarreservaComponent,
  ReservarpackComponent,
  ConsultarreservaComponent
]