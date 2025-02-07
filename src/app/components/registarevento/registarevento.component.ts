import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';  // Necesario para formularios reactivos

@Component({
  selector: 'app-registarevento',
  templateUrl: './registarevento.component.html',
  styleUrls: ['./registarevento.component.scss'],
  imports:[IonicModule,CommonModule,ReactiveFormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class RegistareventoComponent implements OnInit {
  eventForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private alertController: AlertController  // Inyectamos AlertController
  ) {}

  ngOnInit() {
    // Inicializa el formulario con validaciones
    this.eventForm = this.formBuilder.group({
      eventName: ['', [Validators.required]],
      eventDescription: ['', [Validators.required]],
      eventDate: ['', Validators.required],
      eventPhone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Validación para teléfono
      eventEmail: ['', [Validators.required, Validators.email]],
      eventLocation: ['', Validators.required],
    });
  }

  // Método para enviar el formulario
  async onSubmit() {
    if (this.eventForm.valid) {
      const eventData = {
        nombre: this.eventForm.value.eventName,
        descripcion: this.eventForm.value.eventDescription,
        fecha: this.eventForm.value.eventDate,
        telefono: this.eventForm.value.eventPhone,
        email: this.eventForm.value.eventEmail,
        ubicacion: this.eventForm.value.eventLocation,
      };

      // Llamada al servicio para crear el evento
      this.eventService.createEvento(eventData).subscribe(
        async (response) => {
          console.log('Evento creado con éxito:', response);
          // Mostrar mensaje de éxito
          const successAlert = await this.alertController.create({
            header: '¡Éxito!',
            message: 'El evento se ha creado con éxito.',
            buttons: [{
              text: 'OK',
              handler: () => {
                window.location.reload();  // Recargar la página
              },
              cssClass: 'alert-success-button', // Estilo personalizado para el botón
            }],
            cssClass: 'alert-success',  // Estilo CSS para alerta de éxito
          });
          await successAlert.present();
        },
        async (error) => {
          console.error('Error al crear el evento:', error);
          // Mostrar mensaje de error
          const errorAlert = await this.alertController.create({
            header: 'Error',
            message: 'Hubo un error al crear el evento. Por favor, inténtalo de nuevo.',
            buttons: [{
              text: 'OK',
              handler: () => {
                console.log('Intentando de nuevo');
              },
              cssClass: 'alert-error-button', // Estilo personalizado para el botón
            }],
            cssClass: 'alert-error',  // Estilo CSS para alerta de error
          });
          await errorAlert.present();
        }
      );
    } else {
      console.log('Formulario inválido');
      // Mostrar alerta si el formulario no es válido
      const warningAlert = await this.alertController.create({
        header: 'Advertencia',
        message: 'Por favor, completa todos los campos correctamente.',
        buttons: [{
          text: 'OK',
          handler: () => {
            console.log('Formulario no válido');
          },
          cssClass: 'alert-warning-button', // Estilo personalizado para el botón
        }],
        cssClass: 'alert-warning',  // Estilo CSS para alerta de advertencia
      });
      await warningAlert.present();
    }
  }
}
