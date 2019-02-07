import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesOverviewComponent } from './places-overview.component';

describe('PlacesOverviewComponent', () => {
  let component: PlacesOverviewComponent;
  let fixture: ComponentFixture<PlacesOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
