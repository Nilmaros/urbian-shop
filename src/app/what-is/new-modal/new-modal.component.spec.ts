import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewModalComponent } from './new-modal.component';

describe('EditModalComponent', () => {
  let component: NewModalComponent;
  let fixture: ComponentFixture<NewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
