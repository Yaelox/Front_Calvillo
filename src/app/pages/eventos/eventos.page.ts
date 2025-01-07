import { Component, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports:[ReactiveFormsModule,HeaderComponent]
})
export class EventosPage implements OnInit {
  eventForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventDescription: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventLocation: ['', Validators.required],
      eventCapacity: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const eventData = this.eventForm.value;
      this.eventService.registerEvent(eventData).subscribe(
        (response) => {
          // Aquí puedes redirigir a una página de confirmación o detalles del evento
          this.router.navigate(['/events']);
        },
        (error) => {
          console.error('Error al registrar el evento', error);
        }
      );
    }
  }
}
