import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { InventarioService } from 'src/app/services/inventario.service'; // Asegúrate de importar tu servicio

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss'],
  imports:[IonicModule,CommonModule,ReactiveFormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EditarProductoComponent implements OnInit {
  @Input() product: any;
  editProductForm!: FormGroup;
  categorias: any[] = [];
  imagenBase64: string | null = null;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private sanitizer: DomSanitizer,
    private inventarioService: InventarioService // Inyectar el servicio de inventario
  ) {}

  ngOnInit() {
    this.editProductForm = this.formBuilder.group({
      nombre: [this.product?.nombre, Validators.required],
      descripcion: [this.product?.descripcion],
      precio: [this.product?.precio, [Validators.required, Validators.min(0)]],
      stock: [this.product?.stock, [Validators.required, Validators.min(0)]],
      categoria_id: [this.product?.categoria_id, Validators.required],
      imagen: [''], // Aquí se guardará la imagen en Base64
    });

    this.loadCategorias();
    if (this.product?.imagen) {
      this.imagenBase64 = this.product.imagen;
    }
  }

  loadCategorias() {
    this.categoriaService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Asigna la imagen en base64 a la variable
        this.imagenBase64 = reader.result as string;
  
        // Asegúrate de que la imagen se actualiza en el formulario
        this.editProductForm.patchValue({
          imagen: this.imagenBase64,
        });
      };
      reader.readAsDataURL(file);
    }
  }
  
  onSubmit() {
    if (this.editProductForm.valid) {
      console.log('Producto editado:', this.editProductForm.value);
  
      // Preparar el objeto actualizado con los datos del formulario
      const updatedProduct = { ...this.product, ...this.editProductForm.value };

      // Llamar al servicio para actualizar el producto
      this.inventarioService.updateProduct(this.product.id_producto, updatedProduct).subscribe(
        (response) => {
          console.log('Producto actualizado con éxito', response);
          this.dismissModal(updatedProduct);
        },
        (error) => {
          console.log('Error al actualizar el producto', error);
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
  
  dismissModal(data: any = null) {
    this.modalCtrl.dismiss({ success: !!data, product: data });
  }
}
