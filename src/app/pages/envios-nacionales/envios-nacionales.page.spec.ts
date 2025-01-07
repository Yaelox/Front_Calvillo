import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnviosNacionalesPage } from './envios-nacionales.page';

describe('EnviosNacionalesPage', () => {
  let component: EnviosNacionalesPage;
  let fixture: ComponentFixture<EnviosNacionalesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviosNacionalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
