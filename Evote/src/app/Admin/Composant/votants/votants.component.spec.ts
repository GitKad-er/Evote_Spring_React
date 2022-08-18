import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotantsComponent } from './votants.component';

describe('VotantsComponent', () => {
  let component: VotantsComponent;
  let fixture: ComponentFixture<VotantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
