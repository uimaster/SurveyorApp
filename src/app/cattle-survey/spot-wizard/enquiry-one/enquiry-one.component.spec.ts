import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquaryOneComponent } from './enquiry-one.component';

describe('InquaryOneComponent', () => {
  let component: InquaryOneComponent;
  let fixture: ComponentFixture<InquaryOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquaryOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquaryOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
