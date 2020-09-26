import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrestaurantComponent } from './addrestaurant.component';

describe('AddrestaurantComponent', () => {
  let component: AddrestaurantComponent;
  let fixture: ComponentFixture<AddrestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
