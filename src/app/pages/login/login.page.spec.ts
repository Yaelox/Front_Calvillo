import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavController } from '@ionic/angular';
import { of } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authService: jasmine.SpyObj<AuthService>;
  let alertController: jasmine.SpyObj<AlertController>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login']);
    const alertSpy = jasmine.createSpyObj('AlertController', ['create']);

    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: AlertController, useValue: alertSpy },
        NavController
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    alertController = TestBed.inject(AlertController) as jasmine.SpyObj<AlertController>;

    // Configura el comportamiento simulado de la respuesta del servicio
    authService.login.and.returnValue(of({
      user: {
        id_usuario: 1,
        nombre: 'Test User',
        usuario: 'testuser',
        email: 'test@test.com',
        telefono: '1234567890', // Agregar el campo 'telefono'
        tipo_usuario: 'cliente', // Agregar el campo 'tipo_usuario'
        fecha_registro: '2025-03-01' // Agregar el campo 'fecha_registro'
      },
      token: 'fake-token'
    }));
    

    fixture.detectChanges();
  });

  it('should display an alert on successful login', () => {
    const alertSpy = jasmine.createSpyObj('alert', ['present']);
    alertController.create.and.returnValue(Promise.resolve(alertSpy));

    component.loginForm.setValue({ email: 'test@test.com', password: '123456' });
    component.onLogin();

    expect(authService.login).toHaveBeenCalledWith('test@test.com', '123456');
    expect(alertController.create).toHaveBeenCalled();
    expect(alertSpy.present).toHaveBeenCalled();
  });
});
