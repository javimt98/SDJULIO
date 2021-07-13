import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllvehiculosComponent } from './allvehiculos.component';

describe('AllvehiculosComponent', () => {
  let component: AllvehiculosComponent;
  let fixture: ComponentFixture<AllvehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllvehiculosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllvehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
