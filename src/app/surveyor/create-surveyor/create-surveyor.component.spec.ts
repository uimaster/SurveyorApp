import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSurveyorComponent } from './create-surveyor.component';

describe('CreateSurveyorComponent', () => {
  let component: CreateSurveyorComponent;
  let fixture: ComponentFixture<CreateSurveyorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSurveyorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSurveyorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
