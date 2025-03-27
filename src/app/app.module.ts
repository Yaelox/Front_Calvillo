import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; 

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { CategoryModalComponent } from './components/category-modal/category-modal.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { DatePipe } from '@angular/common';





@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(),
     AppRoutingModule,
     HttpClientModule, 
     ReactiveFormsModule, 
     CrearProductoComponent,
     EditarProductoComponent,
     CategoryModalComponent,
     ServiceWorkerModule.register('ngsw-worker.js', 
      {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000',
})],
  providers: [[DatePipe],{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
