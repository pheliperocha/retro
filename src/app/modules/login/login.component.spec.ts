import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '@services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('LoginComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LoginComponent,
            ],
            imports: [
                HttpClientModule,
                RouterTestingModule
            ],
            providers: [AuthService]
        }).compileComponents();

        spyOn(AuthService.prototype, 'checkTokenExpiration').and.stub().and.returnValue(true);
    }));

    it('SHOULD create the Login', async(() => {
        const fixture = TestBed.createComponent(LoginComponent);
        const login = fixture.debugElement.componentInstance;
        expect(login).toBeTruthy();
    }));
});
