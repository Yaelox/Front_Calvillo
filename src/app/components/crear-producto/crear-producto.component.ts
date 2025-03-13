import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { InventarioService } from 'src/app/services/inventario.service';
import { CommonModule } from '@angular/common';
import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { CategoriaService } from 'src/app/services/categoria.service'; // Servicio para cargar categorías

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
  standalone: true,
  imports:[CommonModule, IonicModule, ReactiveFormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CrearProductoComponent implements OnInit {
  productForm: FormGroup;
  categorias: any[] = []; // Para almacenar las categorías
  imagePreview: string | null = null; // Vista previa de la imagen

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private productService: InventarioService,
    private categoriaService: CategoriaService // Inyectar servicio para categorías
  ) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(1)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      categoria: [null, Validators.required],  // Campo para la categoría
      imagen: [''], // Campo para almacenar Base64
    });
  }

  ngOnInit() {
    // Cargar las categorías al inicializar el componente
    this.loadCategories();
  }

  // Método para cargar las categorías
  loadCategories() {
    this.categoriaService.getCategorias().subscribe(
      (response) => {
        this.categorias = response; // Asignar las categorías obtenidas
      },
      (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    );
  }

  // Método para convertir la imagen a Base64
  onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.productForm.patchValue({ imagen: this.imagePreview }); // Guarda la imagen en Base64 en el formulario
      };
      reader.readAsDataURL(file);
    }
  }

  saveProduct() {
    if (this.productForm.valid) {
      const formData = {
        ...this.productForm.value,
        categoria_id: this.productForm.value.categoria, // Asignar categoria_id desde el valor de categoria
      };
  
      // Llamar al servicio con el ID de la categoría
      this.productService.createProduct(formData).subscribe(() => {
        this.modalCtrl.dismiss({ success: true });
      });
    }
  }
  
  // Método para abrir la modal de categoría
  async openCategoryModal() {
    const modal = await this.modalCtrl.create({
      component: CategoryModalComponent,  // Asegúrate de que este componente esté configurado correctamente
      backdropDismiss: false,  // Esto evitará que la modal principal se cierre
    });

    // Ahora presenta la modal
    await modal.present();

    // Después de que la modal se cierre, puedes manejar el resultado (si es necesario)
    const { data } = await modal.onDidDismiss();
    if (data) {
      // Si la categoría fue agregada correctamente, recarga las categorías
      if (data.success) {
        this.loadCategories();  // Recargar categorías
      }

      // Asigna la categoría seleccionada a tu formulario
      this.productForm.patchValue({
        categoria: data?.categoria || '', // Si existe la categoría, la asignamos
      });
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
