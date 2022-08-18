import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeProfileCarteComponent } from './type-profile-carte.component';

describe('TypeProfileCarteComponent', () => {
  let component: TypeProfileCarteComponent;
  let fixture: ComponentFixture<TypeProfileCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeProfileCarteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeProfileCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
