import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditanswersComponent } from './editanswers.component';

describe('EditanswersComponent', () => {
  let component: EditanswersComponent;
  let fixture: ComponentFixture<EditanswersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditanswersComponent]
    });
    fixture = TestBed.createComponent(EditanswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
