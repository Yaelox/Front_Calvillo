import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnviosLocalesPage } from './envios-locales.page';

describe('EnviosLocalesPage', () => {
  let component: EnviosLocalesPage;
  let fixture: ComponentFixture<EnviosLocalesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviosLocalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
