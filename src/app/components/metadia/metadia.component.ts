import { Component,Input} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule} from '@angular/common';
import { ModalController } from '@ionic/angular';
import { MetaService } from 'src/app/services/meta.service';



@Component({ 
  selector: 'app-metadia',
  templateUrl: './metadia.component.html',
  styleUrls: ['./metadia.component.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule]
})
export class  MetaDiaComponent {
    
  meta: number = 0;
  vendidos: number = 0;
  progreso: number = 0;

  constructor(
    private modalCtrl: ModalController,
    private metasService: MetaService
  ) {}

  ngOnInit() {
    this.obtenerMeta();
  }

  obtenerMeta() {
    this.metasService.getMetaDelDia().subscribe({
      next: (res) => {
        this.meta = res.meta || 0;
        this.vendidos = res.vendidos || 0;
        this.progreso = res.progreso || 0;
      },
      error: (err) => {
        console.error('Error al obtener la meta del día:', err);
      }
    });
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}