import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preventa',
  templateUrl: './preventa.component.html',
  styleUrls: ['./preventa.component.scss'],
  standalone: true, 
  imports: [CommonModule]
})
export class PreventaComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
