import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PuntosdeventaPage } from './puntosdeventa.page';

describe('PuntosdeventaPage', () => {
  let component: PuntosdeventaPage;
  let fixture: ComponentFixture<PuntosdeventaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntosdeventaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
