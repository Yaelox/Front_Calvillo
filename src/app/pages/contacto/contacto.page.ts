import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ContactoService } from 'src/app/services/contacto.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule, ReactiveFormsModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContactoPage {
  contactoForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private contactoService: ContactoService) {
    // Inicialización del formulario reactivo
    this.contactoForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  // Función para enviar el mensaje
  enviarMensaje() {
    if (this.contactoForm.valid) {
      const contactoData = this.contactoForm.value;
      this.contactoService.createContacto(contactoData).subscribe(
        (response) => {
          console.log('Mensaje enviado con éxito:', response);
          alert('Mensaje enviado con éxito');
          this.contactoForm.reset(); // Limpiar el formulario
          
          // Recargar la página
          window.location.reload();
        },
        (error) => {
          console.error('Error al enviar el mensaje:', error);
          alert('Ocurrió un error al enviar el mensaje');
        }
      );
    } else {
      console.log('Formulario inválido');
      alert('Por favor, completa todos los campos correctamente');
    }
  }
}
