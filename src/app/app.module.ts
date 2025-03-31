import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms'; 

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { CategoryModalComponent } from './components/category-modal/category-modal.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { AdminEventosPage } from './pages/admin-eventos/admin-eventos.page';
import { CarritoPage } from './pages/carrito/carrito.page';
import { ChecadorPage } from './pages/checador/checador.page';
import { CheckContactosPage } from './pages/check-contactos/check-contactos.page';
import { CheckHistorialPage } from './pages/check-historial/check-historial.page';
import { CheckPedidosPage } from './pages/check-pedidos/check-pedidos.page';
import { CheckEventosPage } from './pages/check-poster/check-eventos.page';
import { CheckVentaRepartidoresPage } from './pages/check-venta-repartidores/check-venta-repartidores.page';
import { CheckoutPage } from './pages/checkout/checkout.page';
import { ConfiguracionPage } from './pages/configuracion/configuracion.page';
import { ContactoPage } from './pages/contacto/contacto.page';
import { EstadisticasPage } from './pages/estadisticas/estadisticas.page';
import { EventosPage } from './pages/eventos/eventos.page';
import { HomePage } from './pages/home/home.page';
import { InventarioPage } from './pages/inventario/inventario.page';
import { MisPedidosPage } from './pages/mis-pedidos/mis-pedidos.page';
import { PreventaPage } from './pages/preventa/preventa.page';
import { ProductDetailsPage } from './pages/product-details/product-details.page';
import { TiendaOnlinePage } from './pages/tienda-online/tienda-online.page';
import { TiendasPage } from './pages/tiendas/tiendas.page';
import { UsuariosPage } from './pages/usuarios/usuarios.page';
import { VentasRepartidorPage } from './pages/ventas-repartidor/ventas-repartidor.page';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AdminEventosPage,
    CarritoPage,
    ChecadorPage,
    CheckHistorialPage,
    CheckVentaRepartidoresPage,
    CheckPedidosPage,
    CheckEventosPage,
    CheckoutPage,
    ConfiguracionPage,
    ContactoPage,
    EstadisticasPage,
    EventosPage,
    InventarioPage,
    LoginPage,
    MisPedidosPage,
    PreventaPage,
    TiendaOnlinePage,
    TiendasPage,
    UsuariosPage,
    VentasRepartidorPage,
    ProductDetailsPage,
    RegisterPage,
    CheckContactosPage,
    ReactiveFormsModule, 
    CrearProductoComponent,
    EditarProductoComponent,
    CategoryModalComponent,
    ServiceWorkerModule.register('ngsw-worker.js', 
      {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000',
      })
  ],
  exports: [],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
