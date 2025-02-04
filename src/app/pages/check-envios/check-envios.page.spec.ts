import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckEnviosPage } from './check-envios.page';

describe('CheckEnviosPage', () => {
  let component: CheckEnviosPage;
  let fixture: ComponentFixture<CheckEnviosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckEnviosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
