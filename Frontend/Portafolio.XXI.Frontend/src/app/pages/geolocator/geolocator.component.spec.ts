import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocatorComponent } from './geolocator.component';

describe('GeolocatorComponent', () => {
  let component: GeolocatorComponent;
  let fixture: ComponentFixture<GeolocatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeolocatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
