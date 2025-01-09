import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
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
    path: 'reparto-domicilio',
    loadChildren: () => import('./pages/reparto-domicilio/reparto-domicilio.module').then( m => m.RepartoDomicilioPageModule)
  },
  {
    path: 'rutas-foraneas',
    loadChildren: () => import('./pages/rutas-foraneas/rutas-foraneas.module').then( m => m.RutasForaneasPageModule)
  },
  {
    path: 'puntosdeventa',
    loadChildren: () => import('./pages/puntosdeventa/puntosdeventa.module').then( m => m.PuntosdeventaPageModule)
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
    path: 'envios',
    loadChildren: () => import('./pages/envios/envios.module').then( m => m.EnviosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
