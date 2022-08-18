import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCarteComponent } from './profile-carte.component';

describe('ProfileCarteComponent', () => {
  let component: ProfileCarteComponent;
  let fixture: ComponentFixture<ProfileCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCarteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
