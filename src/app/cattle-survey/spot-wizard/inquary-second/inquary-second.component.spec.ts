import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquarySecondComponent } from './inquary-second.component';

describe('InquarySecondComponent', () => {
  let component: InquarySecondComponent;
  let fixture: ComponentFixture<InquarySecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquarySecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquarySecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
