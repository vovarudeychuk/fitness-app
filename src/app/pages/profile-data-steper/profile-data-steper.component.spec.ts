import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDataSteperComponent } from './profile-data-steper.component';

describe('ProfileDataSteperComponent', () => {
  let component: ProfileDataSteperComponent;
  let fixture: ComponentFixture<ProfileDataSteperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDataSteperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDataSteperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
