import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-check-pedidos',
  templateUrl: './check-pedidos.page.html',
  styleUrls: ['./check-pedidos.page.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports:[IonicModule,ReactiveFormsModule,FormsModule,CommonModule]
})
export class CheckPedidosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
