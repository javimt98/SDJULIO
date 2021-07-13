import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarreservaComponent } from './consultarreserva.component';

describe('ConsultarreservaComponent', () => {
  let component: ConsultarreservaComponent;
  let fixture: ComponentFixture<ConsultarreservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarreservaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarreservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
