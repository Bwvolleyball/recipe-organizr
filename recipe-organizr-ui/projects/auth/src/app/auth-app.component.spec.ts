import { TestBed, async } from '@angular/core/testing';
import { AuthAppComponent } from './auth-app.component';

describe('AuthAppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthAppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AuthAppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'auth'`, () => {
    const fixture = TestBed.createComponent(AuthAppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('auth');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AuthAppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to auth!');
  });
});
