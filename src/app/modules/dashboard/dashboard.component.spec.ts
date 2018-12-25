import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '@services/api.service';
import { MatDialogModule, MatSidenavModule, MatIconModule, MatMenuModule, MatToolbarModule, MatExpansionModule, MatTooltipModule } from '@angular/material';
import { AuthService } from '@services/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Retrospective } from '@models/retrospective';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from '@components/header/header.component';
import { MyActionsComponent } from '@components/my-actions/myActions.component';
import { RetrospectiveThumbComponent } from '@components/retrospective-thumb/retrospective-thumb.component';
import { AnnotationComponent } from '@components/annotation/annotation.component';
import { RemoveIntersectionPipe } from '@pipes/remove-intersection.pipe';
import { Component, Input } from '@angular/core';

let component: DashboardComponent;
let fixture: ComponentFixture<DashboardComponent>;
let apiService: ApiService;
let spyGetAllRetros: jasmine.Spy;

@Component({
    selector: 'retro-header',
    template: '<p>Mock Product Settings Component</p>'
})
class MockHeaderComponent { @Input() sidenav: any; }

const retroMock: Retrospective[] = [{
    'id': 1,
    'title': 'Retrospective Title 1',
    'context': 'Retrospective Context 1',
    'state': 3,
    'date': '30/09/2018',
    'image': 'http://localhost:4200/assets/images/hopes_concern.png',
    'pin': '1234567',
}, {
    'id': 2,
    'title': 'Retrospective Title 2',
    'context': 'Retrospective Context 2',
    'state': 3,
    'date': '25/12/2018',
    'image': 'http://localhost:4200/assets/images/nice_ok.png',
    'pin': '9876543',
}];

describe('DashboardComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DashboardComponent,
                MockHeaderComponent,
                MyActionsComponent,
                RetrospectiveThumbComponent,
                AnnotationComponent,
                RemoveIntersectionPipe
            ],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                MatSidenavModule,
                MatIconModule,
                MatMenuModule,
                MatToolbarModule,
                MatExpansionModule,
                MatTooltipModule,
                MatDialogModule,
            ],
            providers: [
                ApiService,
                AuthService,
            ]
        }).compileComponents();

        spyOn(AuthService.prototype, 'checkTokenExpiration').and.stub().and.returnValue(true);

    }));

    it('SHOULD create the CreateRetrospectiveComponent', async(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    }));

    it('SHOULD populate retrospectives', async(() => {
        apiService = TestBed.get(ApiService);
        spyGetAllRetros = spyOn(apiService, 'getAllRetrospectives')
            .and.returnValue(Promise.resolve(retroMock));

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.debugElement.componentInstance;
        const html: HTMLElement = fixture.nativeElement;

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(spyGetAllRetros).toHaveBeenCalled();
            expect(component.retrospectives.length).toBe(2);
            expect(html.querySelectorAll('retro-retrospective-thumb').length).toBe(2);
            expect(html.querySelector('retro-retrospective-thumb')).toBeTruthy();
        });
    }));

    it('SHOULD NOT populate retrospectives', async(() => {
        apiService = TestBed.get(ApiService);
        spyGetAllRetros = spyOn(apiService, 'getAllRetrospectives')
            .and.returnValue(Promise.resolve([]));

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.debugElement.componentInstance;
        const html: HTMLElement = fixture.nativeElement;

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(spyGetAllRetros).toHaveBeenCalled();
            expect(component.retrospectives.length).toBe(0);
            expect(html.querySelector('retro-retrospective-thumb')).toBeFalsy();
        });
    }));
});
