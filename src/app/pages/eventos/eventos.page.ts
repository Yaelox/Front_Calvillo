import { Component, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ReactiveFormsModule, HeaderComponent, FooterComponent]
})
export class EventosPage implements OnInit {
  eventForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicialización del formulario
    this.eventForm = this.fb.group({
      eventName: ['', [Validators.required, Validators.minLength(3)]],
      eventDescription: ['', [Validators.required, Validators.minLength(10)]],
      eventDate: ['', Validators.required],
      eventLocation: ['', [Validators.required, Validators.minLength(5)]],
      eventCapacity: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {}

  // Método que se ejecuta al enviar el formulario
  onSubmit(): void {
    if (this.eventForm.valid) {
      const formData = this.eventForm.value;
      console.log('Evento registrado:', formData);

      // Aquí puedes enviar los datos a un servicio o backend
      // Por ejemplo:
      // this.eventService.registerEvent(formData).subscribe(response => {
      //   console.log('Evento guardado con éxito', response);
      // });

      // Reiniciar el formulario después del envío
      this.eventForm.reset();
    } else {
      console.log('El formulario no es válido');
    }
  }
}