import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterStateSnapshot } from '@angular/router';

let authService: AuthService;

const fakeToken = 'FAKE_TOKEN';
const fakeUser = {
    id: 1,
    firstname: 'John',
    image: 'image.jpg',
};

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
const mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

describe('LoginComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                HttpClientModule,
                RouterTestingModule
            ],
            providers: [
                AuthService,
                { provide: Router, useValue: routerSpy },
                { provide: RouterStateSnapshot, useValue: mockSnapshot }
            ]
        });
    });

    describe('User logged in', () => {
        beforeEach(() => {
            localStorage.setItem('token', fakeToken);
            localStorage.setItem('user', JSON.stringify(fakeUser));
        });

        it('SHOULD instantiante user from localStorage', () => {
            authService = TestBed.get(AuthService);
            expect(authService.getToken()).toBe(fakeToken);
            expect(authService.getUser()).toEqual(fakeUser);
        });

        it('SHOULD be logged in', () => {
            authService = TestBed.get(AuthService);
            expect(authService.isLoggedIn()).toBeTruthy();
        });

        it('SHOULD logout and rediret to login', () => {
            authService = TestBed.get(AuthService);
            authService.logout();
            expect(authService.isLoggedIn()).toBeFalsy();

            const spy = routerSpy.navigate as jasmine.Spy;
            const navArgs = spy.calls.first().args[0];
            expect(navArgs).toEqual(['login']);
        });

    });

    describe('User logged out', () => {
        beforeEach(() => {
            localStorage.clear();
        });

        it('SHOULD NOT instantiante user from localStorage', () => {
            authService = TestBed.get(AuthService);
            expect(authService.getToken()).toBeNull();
            expect(authService.getUser()).toBeNull();
        });

        it('SHOULD NOT be logged in', () => {
            authService = TestBed.get(AuthService);
            expect(authService.isLoggedIn()).toBeFalsy();
        });

    });
});
