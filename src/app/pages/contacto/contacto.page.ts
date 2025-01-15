import { Component, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Import these
import { NavController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms'; // Import here
import { IonicModule} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,HeaderComponent,FooterComponent],
})
export class ContactoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
