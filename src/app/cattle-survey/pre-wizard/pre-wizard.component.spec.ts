import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreWizardComponent } from './pre-wizard.component';

describe('PreWizardComponent', () => {
  let component: PreWizardComponent;
  let fixture: ComponentFixture<PreWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
