import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedArtworkComponent } from './featured-artwork.component';

describe('FeaturedArtworkComponent', () => {
  let component: FeaturedArtworkComponent;
  let fixture: ComponentFixture<FeaturedArtworkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturedArtworkComponent]
    });
    fixture = TestBed.createComponent(FeaturedArtworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
