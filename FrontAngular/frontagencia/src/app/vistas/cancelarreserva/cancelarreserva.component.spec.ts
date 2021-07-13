import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarreservaComponent } from './cancelarreserva.component';

describe('CancelarreservaComponent', () => {
  let component: CancelarreservaComponent;
  let fixture: ComponentFixture<CancelarreservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelarreservaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelarreservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
