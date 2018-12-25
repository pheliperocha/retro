import { TestBed, getTestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '@config/environments/environment';
import { Retrospective } from '@models/retrospective';
import { Template } from '@models/template';

let injector: TestBed;
let apiService: ApiService;
let httpMock: HttpTestingController;

const templatesMock: Template[] = [{
    id: 1,
    title: 'Hopes and Concerns',
    image: 'hopes_concern.png'
}, {
    id: 2,
    title: 'Nice and Ok',
    image: 'nice_ok.png'
}];

const retroMock: Retrospective[] = [{
    'id': 1,
    'title': 'Retrospective Title 1',
    'context': 'Retrospective Context 1',
    'state': 3,
    'date': '30/09/2018',
    'image': 'http://localhost:4200/assets/images/hopes_concern.png',
    'pin': '1234567',
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

    it('SHOULD return an Promise<Retrospective[]>', () => {
        apiService.getAllRetrospectives().then(res => {
            expect(res.length).toBe(1);
            expect(res).toEqual(retroMock);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}users/retros`);
        expect(req.request.method).toBe('GET');
        req.flush(retroMock);
    });
});
