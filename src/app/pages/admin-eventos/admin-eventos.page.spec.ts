import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminEventosPage } from './admin-eventos.page';

describe('AdminEventosPage', () => {
  let component: AdminEventosPage;
  let fixture: ComponentFixture<AdminEventosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEventosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
