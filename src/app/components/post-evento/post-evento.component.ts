import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import { FormsModule,FormBuilder,FormGroup, ReactiveFormsModule,Validators} from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Router} from '@angular/router';
import { PosterService } from 'src/app/services/poster.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-post-evento',
  templateUrl: './post-evento.component.html',
  styleUrls: ['./post-evento.component.scss'],
  imports:[CommonModule,IonicModule,ReactiveFormsModule,FormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  standalone:true
})
export class PostEventoComponent{
  eventForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private posterService: PosterService,
    private alertCtrl: AlertController
  ) {
    this.eventForm = this.fb.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
      ubicacion: ['', Validators.required],
    });
  }

  async submitForm() {
    if (this.eventForm.invalid) {
      this.showAlert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    this.loading = true;
    const formData = this.eventForm.value;

    this.posterService.createPoster(formData).subscribe({
      next: async (res) => {
        console.log('Póster registrado exitosamente', res);
        this.loading = false;
        await this.showAlert('Éxito', 'El póster se ha registrado correctamente.');
        this.closeModal();
        location.reload(); // Recarga la página tras el registro
      },
      error: async (err) => {
        console.error('Error al registrar el póster', err);
        this.loading = false;
        await this.showAlert('Error', 'Hubo un problema al registrar el póster. Intenta nuevamente.');
      },
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}