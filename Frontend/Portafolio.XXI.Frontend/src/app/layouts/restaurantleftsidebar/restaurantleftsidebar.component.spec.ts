import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantleftsidebarComponent } from './restaurantleftsidebar.component';

describe('RestaurantleftsidebarComponent', () => {
  let component: RestaurantleftsidebarComponent;
  let fixture: ComponentFixture<RestaurantleftsidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantleftsidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantleftsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
