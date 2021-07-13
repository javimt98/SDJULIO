import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, rutas } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import { AllvehiculosComponent } from './vistas/allvehiculos/allvehiculos.component';
import { AllhotelsComponent } from './vistas/allhotels/allhotels.component';
import { AllvuelosComponent } from './vistas/allvuelos/allvuelos.component';
import { OfertasVehiculosComponent } from './vistas/ofertasvehiculos/ofertasvehiculos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OfertashotelesComponent } from './vistas/ofertashoteles/ofertashoteles.component';
import { OfertasvuelosComponent } from './vistas/ofertasvuelos/ofertasvuelos.component';
import { RegistroComponent } from './vistas/registro/registro.component';
import { CancelarreservaComponent } from './vistas/cancelarreserva/cancelarreserva.component';
import { ReservarpackComponent } from './vistas/reservarpack/reservarpack.component';
import { ConsultarreservaComponent } from './vistas/consultarreserva/consultarreserva.component';


@NgModule({
  declarations: [
    AppComponent,
    rutas,
    AllvehiculosComponent,
    AllhotelsComponent,
    AllvuelosComponent,
    OfertasVehiculosComponent,
    OfertashotelesComponent,
    OfertasvuelosComponent,
    RegistroComponent,
    CancelarreservaComponent,
    ReservarpackComponent,
    ConsultarreservaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
