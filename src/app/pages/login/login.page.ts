import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms'; 
import { IonicModule} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';  // Importa el AlertController

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
  ], 
})
export class LoginPage {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertController: AlertController // Inyecta el AlertController
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Función para navegar a la página de registro
  goToRegister() {
    this.navCtrl.navigateForward('/register'); // Redirige a la página de registro
  }

  // Función de login
  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          this.authService.saveUserToLocalStorage(response.user); // Guarda los datos del usuario
          localStorage.setItem('token', response.token); // Almacena el token
          this.navCtrl.navigateRoot('/home'); // Redirige al inicio o dashboard
          this.showAlert('Login Exitoso', '¡Bienvenido de nuevo!', 'success'); // Muestra la alerta de éxito
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
          this.showAlert('Error al iniciar sesión', 'Credenciales incorrectas. Por favor, inténtalo de nuevo.', 'danger'); // Muestra la alerta de error
        }
      });
    } else {
      this.showAlert('Datos incompletos', 'Por favor, completa todos los campos correctamente.', 'warning'); // Muestra la alerta de falta de datos
    }
  }

  // Función para mostrar alertas
  async showAlert(header: string, message: string, color: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
      cssClass: color,  // Define el color según el tipo de alerta
    });

    await alert.present();
  }
}
