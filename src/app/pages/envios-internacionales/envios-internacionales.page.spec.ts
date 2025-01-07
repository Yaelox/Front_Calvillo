import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnviosInternacionalesPage } from './envios-internacionales.page';

describe('EnviosInternacionalesPage', () => {
  let component: EnviosInternacionalesPage;
  let fixture: ComponentFixture<EnviosInternacionalesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviosInternacionalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
