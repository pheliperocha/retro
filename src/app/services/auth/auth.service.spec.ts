import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterStateSnapshot } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { tick } from '@angular/core/src/render3';

let authService: AuthService;

const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                    'eyJpZCI6MSwiZW1haWwiOiJqb2huLnNub3dAZ21haWwuY29tIiwiaWF0IjoxNTQ1NzcwNTI0LCJleHAiOjE1NDU3NzA0ODd9.' +
                    'ZTNDBClef38OJMOol5m9IK26rB7GRysbLOYx8-yIIiM';
const fakeUser = {
    id: 1,
    firstname: 'John',
    image: 'image.jpg',
};

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
const mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

describe('AuthService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                HttpClientTestingModule,
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
            spyOn(AuthService.prototype, 'checkTokenExpiration').and.stub().and.returnValue(true);
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

    describe('User logged in with expired token', () => {
        it('SHOULD logout on expired token', () => {
            localStorage.setItem('token', fakeToken);
            localStorage.setItem('user', JSON.stringify(fakeUser));

            authService = TestBed.get(AuthService);
            const isOkay = authService.checkTokenExpiration();
            expect(isOkay).toBeFalsy();
            expect(authService.isLoggedIn()).toBeFalsy();

            const spy = routerSpy.navigate as jasmine.Spy;
            const navArgs = spy.calls.first().args[0];
            expect(navArgs).toEqual(['login']);
        });

        it('SHOULD logout on invald token', () => {
            localStorage.setItem('token', 'INVALID_TOKEN');
            localStorage.setItem('user', JSON.stringify(fakeUser));

            authService = TestBed.get(AuthService);
            const isOkay = authService.checkTokenExpiration();
            expect(isOkay).toBeFalsy();
            expect(authService.isLoggedIn()).toBeFalsy();

            const spy = routerSpy.navigate as jasmine.Spy;
            const navArgs = spy.calls.first().args[0];
            expect(navArgs).toEqual(['login']);
        });

        it('SHOULD not logout on valid token', () => {
            localStorage.setItem('token', fakeToken);
            localStorage.setItem('user', JSON.stringify(fakeUser));

            const today = new Date();
            const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            spyOn(AuthService.prototype, 'getDecodedToken').and.stub().and.returnValue({ exp: Math.round(+nextWeek / 1000) });

            authService = TestBed.get(AuthService);
            const isOkay = authService.checkTokenExpiration();
            expect(isOkay).toBeTruthy();
            expect(authService.isLoggedIn()).toBeTruthy();
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
