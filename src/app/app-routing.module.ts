import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./pages/contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'preventa',
    loadChildren: () => import('./pages/preventa/preventa.module').then( m => m.PreventaPageModule)
  },
  {
    path: 'eventos',
    loadChildren: () => import('./pages/eventos/eventos.module').then( m => m.EventosPageModule)
  },
  {
    path: 'tienda-online',
    loadChildren: () => import('./pages/tienda-online/tienda-online.module').then( m => m.TiendaOnlinePageModule)
  },
  {
    path: 'product-details/:id',
    loadChildren: () => import('./pages/product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./pages/configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./pages/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'tiendas',
    loadChildren: () => import('./pages/tiendas/tiendas.module').then( m => m.TiendasPageModule)
  },

  {
    path: 'check-eventos',
    loadChildren: () => import('./pages/check-poster/check-eventos.module').then( m => m.CheckEventosPageModule)
  },
  {
    path: 'check-envios',
    loadChildren: () => import('./pages/check-envios/check-envios.module').then( m => m.CheckEnviosPageModule)
  },
  {
    path: 'check-contactos',
    loadChildren: () => import('./pages/check-contactos/check-contactos.module').then( m => m.CheckContactosPageModule)
  },
  {
    path: 'admin-eventos',
    loadChildren: () => import('./pages/admin-eventos/admin-eventos.module').then( m => m.AdminEventosPageModule)
  },
  {
    path: 'check-pedidos',
    loadChildren: () => import('./pages/check-pedidos/check-pedidos.module').then( m => m.CheckPedidosPageModule)
  },
  {
    path: 'mis-pedidos',
    loadChildren: () => import('./pages/mis-pedidos/mis-pedidos.module').then( m => m.MisPedidosPageModule)
  },
  {
    path: 'checador',
    loadChildren: () => import('./pages/checador/checador.module').then( m => m.ChecadorPageModule)
  },
  {
    path: 'check-historial',
    loadChildren: () => import('./pages/check-historial/check-historial.module').then( m => m.CheckHistorialPageModule)
  },
  {
    path: 'inventario',
    loadChildren: () => import('./pages/inventario/inventario.module').then( m => m.InventarioPageModule)
  },
  {
    path: 'ventas-repartidor',
    loadChildren: () => import('./pages/ventas-repartidor/ventas-repartidor.module').then( m => m.VentasRepartidorPageModule)
  },
  {
    path: 'check-venta-repartidores',
    loadChildren: () => import('./pages/check-venta-repartidores/check-venta-repartidores.module').then( m => m.CheckVentaRepartidoresPageModule)
  },
  {
    path: 'estadisticas',
    loadChildren: () => import('./pages/estadisticas/estadisticas.module').then( m => m.EstadisticasPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }  // Usa el HashLocationStrategy
  ]
})
export class AppRoutingModule { }
