import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturaComponent } from './lectura.component';

describe('LecturaComponent', () => {
  let component: LecturaComponent;
  let fixture: ComponentFixture<LecturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LecturaComponent]
    });
    fixture = TestBed.createComponent(LecturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
