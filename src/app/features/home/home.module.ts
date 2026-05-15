import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { FeaturedArtistsComponent } from './components/featured-artists/featured-artists.component';
import { CuratedCollectionsComponent } from './components/curated-collections/curated-collections.component';
import { FeaturedArtworkComponent } from './components/featured-artwork/featured-artwork.component';
import { UpcomingEventsComponent } from './components/upcoming-events/upcoming-events.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeroSectionComponent,
    FeaturedArtistsComponent,
    CuratedCollectionsComponent,
    FeaturedArtworkComponent,
    UpcomingEventsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
