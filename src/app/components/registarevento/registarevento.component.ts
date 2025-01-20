import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registarevento',
  templateUrl: './registarevento.component.html',
  styleUrls: ['./registarevento.component.scss'],
  imports:[CommonModule,ReactiveFormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class RegistareventoComponent{
  eventForm: FormGroup;

  // Emit an event when the form is submitted
  @Output() formSubmitted = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      eventName: ['', [Validators.required]],
      eventDescription: ['', [Validators.required]],
      eventDate: ['', [Validators.required]],
      eventLocation: ['', [Validators.required]],
      eventCapacity: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      this.formSubmitted.emit(this.eventForm.value);
      this.eventForm.reset(); // Reset form after submission
    }
  }
}