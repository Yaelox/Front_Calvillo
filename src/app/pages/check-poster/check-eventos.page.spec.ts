import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckEventosPage } from './check-eventos.page';

describe('CheckEventosPage', () => {
  let component: CheckEventosPage;
  let fixture: ComponentFixture<CheckEventosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckEventosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
