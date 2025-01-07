import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-preventa',
  templateUrl: './preventa.component.html',
  styleUrls: ['./preventa.component.scss'],
  standalone: true, 
  imports: [HeaderComponent]
})
export class PreventaComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
