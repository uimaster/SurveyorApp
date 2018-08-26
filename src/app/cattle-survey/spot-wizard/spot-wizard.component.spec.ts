import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotWizardComponent } from './spot-wizard.component';

describe('SpotWizardComponent', () => {
  let component: SpotWizardComponent;
  let fixture: ComponentFixture<SpotWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
