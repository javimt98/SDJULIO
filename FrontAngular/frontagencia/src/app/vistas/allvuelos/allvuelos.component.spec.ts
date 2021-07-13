import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllvuelosComponent } from './allvuelos.component';

describe('AllvuelosComponent', () => {
  let component: AllvuelosComponent;
  let fixture: ComponentFixture<AllvuelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllvuelosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllvuelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
