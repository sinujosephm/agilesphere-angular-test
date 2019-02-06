import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherContainer } from './containers/weather.container';
import { WeatherService } from './services/weather.service';
import { SearchComponent } from './components/search/search.component';
import { ResultsComponent } from './components/results/results.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffect } from './store/effects/weather.effect';
import { Reducers } from './store/reducers/weather.reducer';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forFeature('weather', Reducers),
    EffectsModule.forFeature([WeatherEffect])
  ],
  declarations: [
    SearchComponent,
    ResultsComponent,
    WeatherContainer
  ],
  providers: [
    WeatherService
  ]
})
export class WeatherModule { }
