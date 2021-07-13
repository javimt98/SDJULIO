import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertashotelesComponent } from './ofertashoteles.component';

describe('OfertashotelesComponent', () => {
  let component: OfertashotelesComponent;
  let fixture: ComponentFixture<OfertashotelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfertashotelesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertashotelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
