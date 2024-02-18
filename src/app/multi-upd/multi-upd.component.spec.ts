import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiUpdComponent } from './multi-upd.component';

describe('MultiUpdComponent', () => {
  let component: MultiUpdComponent;
  let fixture: ComponentFixture<MultiUpdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiUpdComponent]
    });
    fixture = TestBed.createComponent(MultiUpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
