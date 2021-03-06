import { Component } from '@angular/core';

import { TravelRequestsPage } from '../travelRequests/travelRequests';
import { HomePage } from '../home/home';
import { RecomendationsPage } from '../recomendations/recomendations';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TravelRequestsPage;
  tab3Root = RecomendationsPage;

  constructor() {

  }
}
