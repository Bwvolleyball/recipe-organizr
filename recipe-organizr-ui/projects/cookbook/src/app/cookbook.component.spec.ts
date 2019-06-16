import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookbookComponent } from './cookbook.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        CookbookComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CookbookComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'cookbook'`, () => {
    const fixture = TestBed.createComponent(CookbookComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('cookbook');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(CookbookComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to cookbook!');
  });
});
