import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {
  MatCardModule,
  MatIconModule,
  MatProgressBarModule,
  MatTooltipModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { CardComponent } from '@components/card/card.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CardComponent,
      ],
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatCardModule,
        MatProgressBarModule,
        MatTooltipModule,
      ],
      providers: []
    }).compileComponents();
  }));

  it('SHOULD create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
