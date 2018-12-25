import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterStateSnapshot } from '@angular/router';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '@config/environments/environment';

let injector: TestBed;
let apiService: ApiService;
let httpMock: HttpTestingController;

const templatesMock = [{
    id: 1,
    title: 'Hopes and Concerns',
    image: 'hopes_concern.png'
}, {
    id: 2,
    title: 'Nice and Ok',
    image: 'nice_ok.png'
}];

describe('ApiService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                ApiService
            ]
        });

        injector = getTestBed();
        apiService = injector.get(ApiService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('SHOULD return an Promise<Template[]>', () => {
        apiService.getAllTemplates().then(res => {
            expect(res.length).toBe(2);
            expect(res).toEqual(templatesMock);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}templates`);
        expect(req.request.method).toBe('GET');
        req.flush(templatesMock);
    });
});
