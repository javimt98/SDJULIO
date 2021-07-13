import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservarpackComponent } from './reservarpack.component';

describe('ReservarpackComponent', () => {
  let component: ReservarpackComponent;
  let fixture: ComponentFixture<ReservarpackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservarpackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservarpackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
