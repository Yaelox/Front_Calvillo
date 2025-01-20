import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-event-carousel',
  templateUrl: './event-carousel.component.html',
  styleUrls: ['./event-carousel.component.scss'],
  imports:[CommonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EventCarouselComponent {
  // Lista de eventos (puedes cambiarla con los datos reales)
  events = [
    {
      title: 'Evento 1',
      description: 'Descripción del evento 1',
      imageUrl: 'assets/images/Logo.png',
      date: '2025-01-20',
    },
    {
      title: 'Evento 2',
      description: 'Descripción del evento 2',
      imageUrl: 'assets/images/Logo.png',
      date: '2025-02-15',
    },
    {
      title: 'Evento 3',
      description: 'Descripción del evento 3',
      imageUrl: 'assets/images/Logo.png',
      date: '2025-03-10',
    },
  ];

  currentIndex: number = 0;

  // Función para navegar al siguiente evento
  nextEvent() {
    if (this.currentIndex < this.events.length - 1) {
      this.currentIndex++;
    }
  }

  // Función para navegar al evento anterior
  prevEvent() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  // Función para seleccionar un evento específico desde el indicador
  setCurrentEvent(index: number) {
    this.currentIndex = index;
  }
}
