import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreventaPage } from './preventa.page';

describe('PreventaPage', () => {
  let component: PreventaPage;
  let fixture: ComponentFixture<PreventaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
