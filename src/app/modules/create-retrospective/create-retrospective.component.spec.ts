import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateRetrospectiveComponent } from './create-retrospective.component';
import { ApiService } from '@services/api.service';
import { RetrospectiveService } from '@services/retrospective.service';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { MatInputModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '@services/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

let component: CreateRetrospectiveComponent;
let fixture: ComponentFixture<CreateRetrospectiveComponent>;
let apiService: ApiService;
let spyGetAllTemplates: jasmine.Spy;

const templatesMock = [{
    id: 1,
    title: 'Hopes and Concerns',
    image: ''
}, {
    id: 2,
    title: 'Nice and Ok',
    image: ''
}];

describe('CreateRetrospectiveComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CreateRetrospectiveComponent,
            ],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                SwiperModule,
                MatInputModule,
                MatDialogModule,
            ],
            providers: [
                RetrospectiveService,
                ApiService,
                AuthService,
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: [] }
            ]
        }).compileComponents();

        spyOn(AuthService.prototype, 'checkTokenExpiration').and.stub().and.returnValue(true);

    }));

    it('SHOULD create the CreateRetrospectiveComponent', async(() => {
        fixture = TestBed.createComponent(CreateRetrospectiveComponent);
        component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    }));

    it('SHOULD populate templates', async(() => {
        apiService = TestBed.get(ApiService);
        spyGetAllTemplates = spyOn(apiService, 'getAllTemplates')
            .and.returnValue(Promise.resolve(templatesMock));

        fixture = TestBed.createComponent(CreateRetrospectiveComponent);
        component = fixture.debugElement.componentInstance;
        const html: HTMLElement = fixture.nativeElement;

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(spyGetAllTemplates).toHaveBeenCalled();
            expect(component.templates.length).toBe(2);
            expect(html.querySelector('swiper')).toBeTruthy();
            expect(html.textContent).not.toContain('Nenhum template cadastrado');
            expect(html.textContent).toContain('Hopes and Concerns');
            expect(html.textContent).toContain('Nice and Ok');
        });
    }));

    it('SHOULD print "Nenhum template cadastrado"', async(() => {
        apiService = TestBed.get(ApiService);
        spyGetAllTemplates = spyOn(apiService, 'getAllTemplates').and.returnValue(Promise.resolve([]));
        fixture = TestBed.createComponent(CreateRetrospectiveComponent);
        component = fixture.debugElement.componentInstance;
        const html: HTMLElement = fixture.nativeElement;

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(spyGetAllTemplates).toHaveBeenCalled();
            expect(component.templates.length).toBe(0);
            expect(html.querySelector('swiper')).toBeFalsy();
            expect(html.textContent).toContain('Nenhum template cadastrado');
        });
    }));
});
