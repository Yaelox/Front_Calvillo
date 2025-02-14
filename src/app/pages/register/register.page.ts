import { Component, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
  ],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public navCtrl: NavController,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telefono: ['', [Validators.required]],
      tipo_usuario: ['', [Validators.required]], // Por ejemplo, 'cliente' o 'admin'
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telefono: ['', [Validators.required]],
      tipo_usuario: ['cliente'], // Valor predeterminado invisible
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { nombre,usuario, email, password,telefono, tipo_usuario } = this.registerForm.value;

      this.authService.registerUser({ nombre ,usuario, email, password,telefono, tipo_usuario }).subscribe({
        next: (response) => {
          console.log('Usuario registrado:', response);
          alert('Usuario registrado correctamente');
          this.navCtrl.navigateRoot('/login'); // Redirige a la página de inicio de sesión
        },
        error: (err) => {
          console.error('Error al registrar usuario:', err);
          alert(err.error.message || 'Error al registrar usuario. Inténtalo de nuevo.');
        },
      });
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
