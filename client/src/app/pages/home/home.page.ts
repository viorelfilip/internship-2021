import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private currentTab: string
  constructor() {
  }

  tabChanged(event) {
    this.currentTab = event.tab;
  }

  isActive(tab: string) {
    return tab === this.currentTab;
  }

  getIconSize(tab: string) {
    if (this.isActive(tab)) {
      return "large";
    }
    return 'small';
  }
}
