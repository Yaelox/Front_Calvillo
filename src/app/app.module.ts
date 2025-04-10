import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { TiendaService } from './services/tienda.service';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { CategoriaService } from './services/categoria.service';
import { ChecadorService } from './services/checador.service';

import { ComprasService } from './services/compras.service';
import { ContactoService } from './services/contacto.service';
import { EstadisticasService } from './services/estadisticas.service';
import { EventService } from './services/event.service';
import { InventarioService } from './services/inventario.service';
import { PosterService } from './services/poster.service';
import { RepartidorService } from './services/repartidor.service';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  exports: [],
  providers: [UserService,
    TiendaService,
    AuthService,
    CartService,
    CategoriaService,
    ChecadorService,
    ComprasService,
    ContactoService,
    EstadisticasService,
    EventService,
    InventarioService,
    PosterService,
    RepartidorService,
    UserService,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
