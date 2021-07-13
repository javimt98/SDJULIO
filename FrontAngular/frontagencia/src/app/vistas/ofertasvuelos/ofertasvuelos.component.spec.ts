import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasvuelosComponent } from './ofertasvuelos.component';

describe('OfertasvuelosComponent', () => {
  let component: OfertasvuelosComponent;
  let fixture: ComponentFixture<OfertasvuelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfertasvuelosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertasvuelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
