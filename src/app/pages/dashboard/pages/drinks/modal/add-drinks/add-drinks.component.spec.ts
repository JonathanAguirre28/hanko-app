import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDrinksComponent } from './add-drinks.component';

describe('AddDrinksComponent', () => {
  let component: AddDrinksComponent;
  let fixture: ComponentFixture<AddDrinksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDrinksComponent]
    });
    fixture = TestBed.createComponent(AddDrinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
