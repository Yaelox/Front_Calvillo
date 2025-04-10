import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, OnDestroy } from '@angular/core';
import { ChecadorService } from '../../services/checador.service';
import { IonicModule, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-checador',
  templateUrl: './checador.page.html',
  styleUrls: ['./checador.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports:[IonicModule,HeaderComponent]
})
export class ChecadorPage implements OnInit, OnDestroy {
  usuario_id: number | null = null;
  horaActual: string = '';
  private intervaloHora: any;

  constructor(
    private checadorService: ChecadorService,
    private userService: UserService,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerUsuarioLogueado();
    this.iniciarReloj();
  }

  ngOnDestroy() {
    if (this.intervaloHora) {
      clearInterval(this.intervaloHora);
    }
  }

  async obtenerUsuarioLogueado() {
    this.usuario_id = this.userService.getUserIdFromLocalStorage();
    if (!this.usuario_id) {
      this.mostrarError('No se pudo obtener el usuario logueado.');
    }
  }

  iniciarReloj() {
    this.intervaloHora = setInterval(() => {
      const ahora = new Date();
      this.horaActual = ahora.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    }, 1000);
  }

  async obtenerUbicacion(): Promise<{ latitud: number; longitud: number }> {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitud: position.coords.latitude,
              longitud: position.coords.longitude
            });
          },
          (error) => {
            reject('Error obteniendo ubicación: ' + error.message);
          }
        );
      } else {
        reject('Geolocalización no soportada.');
      }
    });
  }

  async checarEntrada() {
    if (!this.usuario_id) {
      this.mostrarError('Usuario no identificado.');
      return;
    }

    try {
      const ubicacion = await this.obtenerUbicacion();
      console.log('Ubicación:', ubicacion);

      this.checadorService.registrarEntrada(this.usuario_id, ubicacion.latitud, ubicacion.longitud, this.horaActual)
        .subscribe(
          async (response) => {
            console.log('Respuesta del servidor:', response);
            await this.mostrarToast('Entrada registrada con éxito');
            await this.redirigirAHome();
          },
          async (error) => {
            console.error('Error en la petición:', error);
            await this.mostrarError('Error al registrar entrada');
          }
        );
    } catch (error) {
      console.error('Error al obtener ubicación:', error);
      await this.mostrarError(error instanceof Error ? error.message : 'Error desconocido');
    }
  }

  async checarSalida() {
    if (!this.usuario_id) {
      this.mostrarError('Usuario no identificado.');
      return;
    }
    try {
      const ubicacion = await this.obtenerUbicacion();
      this.checadorService.registrarSalida(this.usuario_id, ubicacion.latitud, ubicacion.longitud, this.horaActual)
        .subscribe(
          async () => {
            await this.mostrarToast('Salida registrada con éxito');
            await this.redirigirAHome();
          },
          async () => {
            await this.mostrarError('Error al registrar salida');
          }
        );
    } catch (error) {
      await this.mostrarError(error instanceof Error ? error.message : 'Error desconocido');
    }
  }

  // Mostrar el Toast de éxito
  async mostrarToast(mensaje: string) {
    console.log('Mostrando Toast de éxito...');
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  // Mostrar el Toast de error
  async mostrarError(mensaje: string) {
    console.log('Mostrando Toast de error...');
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      color: 'danger',
      position: 'top'
    });

    toast.present().then(() => {
      console.log("Toast de error presentado.");
    }).catch(err => {
      console.error("Error al presentar el Toast: ", err);
    });
  }

  async redirigirAHome() {
    this.router.navigate(['/home']).then(() => {
      console.log('Redirigiendo a home');
    }).catch(err => {
      console.error('Error al redirigir:', err);
    });
  }
}
