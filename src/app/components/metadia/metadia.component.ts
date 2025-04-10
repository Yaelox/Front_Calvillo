import { Component,Input} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule} from '@angular/common';
import { ModalController } from '@ionic/angular';



@Component({ 
  selector: 'app-metadia',
  templateUrl: './metadia.component.html',
  styleUrls: ['./metadia.component.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule]
})
export class  MetaDiaComponent {
    @Input() meta!: number;
    @Input() vendidos!: number;
    @Input() progreso!: number;
  
    constructor(private modalCtrl: ModalController) {}
  
    cerrar() {
      this.modalCtrl.dismiss();
    }
  }