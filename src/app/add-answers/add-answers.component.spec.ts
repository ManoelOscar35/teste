import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnswersComponent } from './add-answers.component';

describe('AddAnswersComponent', () => {
  let component: AddAnswersComponent;
  let fixture: ComponentFixture<AddAnswersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAnswersComponent]
    });
    fixture = TestBed.createComponent(AddAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
