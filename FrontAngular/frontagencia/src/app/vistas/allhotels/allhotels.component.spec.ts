import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllhotelsComponent } from './allhotels.component';

describe('AllhotelsComponent', () => {
  let component: AllhotelsComponent;
  let fixture: ComponentFixture<AllhotelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllhotelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllhotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
