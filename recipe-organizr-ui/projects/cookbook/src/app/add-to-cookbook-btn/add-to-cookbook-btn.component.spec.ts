import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCookbookBtnComponent } from './add-to-cookbook-btn.component';

describe('AddToCookbookBtnComponent', () => {
  let component: AddToCookbookBtnComponent;
  let fixture: ComponentFixture<AddToCookbookBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToCookbookBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCookbookBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
