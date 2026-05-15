import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedArtistsComponent } from './featured-artists.component';

describe('FeaturedArtistsComponent', () => {
  let component: FeaturedArtistsComponent;
  let fixture: ComponentFixture<FeaturedArtistsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturedArtistsComponent]
    });
    fixture = TestBed.createComponent(FeaturedArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
