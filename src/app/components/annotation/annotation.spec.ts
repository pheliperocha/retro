import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ApiService } from '@services/api.service';
import { MatIconModule, MatMenuModule, MatTooltipModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnnotationComponent } from '@components/annotation/annotation.component';
import { RemoveIntersectionPipe } from '@pipes/remove-intersection.pipe';

let component: AnnotationComponent;
let fixture: ComponentFixture<AnnotationComponent>;

const annotationMock = {
    id: 1,
    description: 'Annotation description 1',
    responsibles: [
        {
            id: 1,
            firstname: 'Jon',
            lastname: 'Snow',
            image: ''
        },
        {
            id: 2,
            firstname: 'Daenerys',
            lastname: 'Targaryen',
            image: ''
        }
    ]
};

describe('AnnotationComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AnnotationComponent,
                RemoveIntersectionPipe
            ],
            imports: [
                HttpClientTestingModule,
                BrowserAnimationsModule,
                MatIconModule,
                MatMenuModule,
                MatTooltipModule,
            ],
            providers: [
                ApiService,
            ]
        }).compileComponents();
    }));

    it('SHOULD create the AnnotationComponent', async(() => {
        fixture = TestBed.createComponent(AnnotationComponent);
        component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    }));

    it('SHOULD render annotation properly', async(() => {
        fixture = TestBed.createComponent(AnnotationComponent);
        component = fixture.debugElement.componentInstance;
        const html: HTMLElement = fixture.nativeElement;
        component.annotation = annotationMock;

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(html.textContent).toContain(annotationMock.description);
            expect(html.querySelectorAll('.desc').length).toBe(1);
            expect(html.querySelectorAll('.user').length).toBe(2);
            expect(html.querySelectorAll('.user').item(0).getAttribute('ng-reflect-message'))
                .toBe(annotationMock.responsibles[0].firstname);
        });
    }));
});
