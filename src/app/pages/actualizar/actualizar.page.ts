import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.page.html',
  styleUrls: ['./actualizar.page.scss'],
  imports:[IonicModule,CommonModule,FormsModule,ReactiveFormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ActualizarPage implements OnInit {
  formulario!: FormGroup;
  mensajeToast: string | null = null;

  constructor(
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private userService: UserService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async mostrarLoading(message: string) {
    const loading = await this.loadingCtrl.create({
      message,
      spinner: 'circles',
      duration: 3000,
    });
    await loading.present();
    return loading;
  }

  async actualizar() {
    if (this.formulario.invalid) {
      this.mensajeToast = 'Completa todos los campos correctamente.';
      return;
    }

    const { email, password } = this.formulario.value;

    try {
      const loading = await this.mostrarLoading('Actualizando contraseña...');
      const response = await this.userService.actualizar(email, password).toPromise();
      await loading.dismiss();

      this.mensajeToast = 'Contraseña actualizada correctamente.';
      this.formulario.reset();
      this.router.navigate(['/login']);
      
    } catch (error: any) {
      await this.loadingCtrl.dismiss();
      this.mensajeToast = error || 'Ocurrió un error inesperado al actualizar la contraseña.';
    }
  }
}
