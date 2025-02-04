import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckContactosPage } from './check-contactos.page';

describe('CheckContactosPage', () => {
  let component: CheckContactosPage;
  let fixture: ComponentFixture<CheckContactosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckContactosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
