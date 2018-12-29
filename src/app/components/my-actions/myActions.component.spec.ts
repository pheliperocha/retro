import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ApiService } from '@services/api.service';
import { MatIconModule, MatMenuModule, MatExpansionModule, MatTooltipModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyActionsComponent } from '@components/my-actions/myActions.component';
import { AnnotationComponent } from '@components/annotation/annotation.component';
import { RemoveIntersectionPipe } from '@pipes/remove-intersection.pipe';

let component: MyActionsComponent;
let fixture: ComponentFixture<MyActionsComponent>;
let apiService: ApiService;
let spyGetAllMyActions: jasmine.Spy;

const retroMock = [
    {
        id: 1,
        title: 'Retrospective Title 1',
        annotations: [
            {
                id: 1,
                description: '',
                responsibles: []
            },
            {
                id: 3,
                description: '',
                responsibles: []
            }
        ]
    },
    {
        id: 2,
        title: 'Retrospective Title 2',
        annotations: [
            {
                id: 4,
                description: '',
                responsibles: []
            },
            {
                id: 5,
                description: '',
                responsibles: []
            }
        ]
    }
];

describe('MyActionsComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MyActionsComponent,
                AnnotationComponent,
                RemoveIntersectionPipe
            ],
            imports: [
                HttpClientTestingModule,
                BrowserAnimationsModule,
                MatIconModule,
                MatMenuModule,
                MatExpansionModule,
                MatTooltipModule,
            ],
            providers: [
                ApiService
            ]
        }).compileComponents();
    }));

    it('SHOULD create the MyActionsComponent', async(() => {
        fixture = TestBed.createComponent(MyActionsComponent);
        component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    }));

    it('SHOULD populate retrospectives', async(() => {
        apiService = TestBed.get(ApiService);
        spyGetAllMyActions = spyOn(apiService, 'getAllMyActions')
            .and.returnValue(Promise.resolve(retroMock));

        fixture = TestBed.createComponent(MyActionsComponent);
        component = fixture.debugElement.componentInstance;
        const html: HTMLElement = fixture.nativeElement;

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(spyGetAllMyActions).toHaveBeenCalled();
            expect(component.retrospectives.length).toBe(2);
            expect(component.retrospectives[0].title).toBe(retroMock[0].title);
            expect(html.textContent).toContain(retroMock[1].title);
            expect(html.querySelectorAll('mat-expansion-panel').length).toBe(2);
            expect(html.querySelectorAll('retro-annotation').length).toBe(4);
        });
    }));

    it('SHOULD NOT populate retrospectives', async(() => {
        apiService = TestBed.get(ApiService);
        spyGetAllMyActions = spyOn(apiService, 'getAllMyActions')
            .and.returnValue(Promise.resolve([]));

        fixture = TestBed.createComponent(MyActionsComponent);
        component = fixture.debugElement.componentInstance;
        const html: HTMLElement = fixture.nativeElement;

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(spyGetAllMyActions).toHaveBeenCalled();
            expect(component.retrospectives.length).toBe(0);
            expect(html.textContent).toContain('Você não está atribuido em nenhuma anotação');
            expect(html.querySelector('mat-expansion-panel')).toBeFalsy();
            expect(html.querySelector('retro-annotation')).toBeFalsy();
        });
    }));
});
