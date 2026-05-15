import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuratedCollectionsComponent } from './curated-collections.component';

describe('CuratedCollectionsComponent', () => {
  let component: CuratedCollectionsComponent;
  let fixture: ComponentFixture<CuratedCollectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuratedCollectionsComponent]
    });
    fixture = TestBed.createComponent(CuratedCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
