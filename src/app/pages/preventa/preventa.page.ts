import { Component, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preventa',
  templateUrl: './preventa.page.html',
  styleUrls: ['./preventa.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [HeaderComponent, FooterComponent, CommonModule],
})
export class PreventaPage{
  productos = [
    {
      id: 1,
      nombre: 'Caja de Dulces Mixta',
      descripcion: 'Una selección de dulces surtidos.',
      precio: 150,
      imagen: 'assets/images/dulces-mixta.jpg',
    },
    {
      id: 2,
      nombre: 'Paletas Artesanales',
      descripcion: 'Paletas elaboradas con ingredientes naturales.',
      precio: 50,
      imagen: 'assets/images/paletas.jpg',
    },
    {
      id: 3,
      nombre: 'Chocolates de Temporada',
      descripcion: 'Deliciosos chocolates decorados para la temporada.',
      precio: 200,
      imagen: 'assets/images/chocolates.jpg',
    },
  ];

  reservarProducto(producto: any) {
    console.log(`Producto reservado: ${producto.nombre}`);
    // Aquí podrías integrar una llamada al backend para registrar la preventa
  }
}