import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PosterService } from 'src/app/services/poster.service';

interface Poster {
  id_eventos: number;
  nombre: string;
  fecha: string;
  descripcion: string;
  ubicacion: string;
}
@Component({
  selector: 'app-event-carousel',
  templateUrl: './event-carousel.component.html',
  styleUrls: ['./event-carousel.component.scss'],
  imports:[CommonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  standalone:true
})
export class EventCarouselComponent {
  events: Poster[] = [];
  currentIndex: number = 0;
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private posterService: PosterService) {}

  ngOnInit() {
    this.loadPosters();
  }

  loadPosters() {
    this.posterService.getPoster().subscribe({
      next: (data) => {
        this.events = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los pósters';
        console.error('Error en la API:', error);
        this.loading = false;
      }
    });
  }

  prevEvent() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextEvent() {
    if (this.currentIndex < this.events.length - 1) {
      this.currentIndex++;
    }
  }

  setCurrentEvent(index: number) {
    this.currentIndex = index;
  }
}
