import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckHistorialPage } from './check-historial.page';

describe('CheckHistorialPage', () => {
  let component: CheckHistorialPage;
  let fixture: ComponentFixture<CheckHistorialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckHistorialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
