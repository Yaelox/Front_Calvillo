import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CategoriaService, Categoria } from 'src/app/services/categoria.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Para usar formularios reactivos

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule,FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoryModalComponent {
  categorias: Categoria[] = []; // Para almacenar las categorías obtenidas
  categoryForm!: FormGroup;  // Formulario reactivo

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService // Inyectamos el servicio
  ) {}

  ngOnInit() {
    // Inicializamos el formulario con validaciones
    this.categoryForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  // Método para cerrar la modal sin realizar ninguna acción
  closeModal() {
    this.modalController.dismiss();
  }

  // Método para guardar una nueva categoría
  saveCategory() {
    if (this.categoryForm.valid) {
      const categoryData: Categoria = this.categoryForm.value; // Usar la interfaz de Categoria

      // Usar el método correcto del servicio para crear la categoría
      this.categoriaService.createCategoria(categoryData).subscribe(
        (response) => {
          console.log('Categoría guardada:', response);
          this.modalController.dismiss({ category: response });
        },
        (error) => {
          console.error('Error al guardar categoría:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
}