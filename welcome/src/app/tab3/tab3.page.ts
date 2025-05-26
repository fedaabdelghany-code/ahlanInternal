import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  constructor() {}
// In your component.ts
scrollToMap() {
  const map = document.querySelector('.map-card');
  if (map) map.scrollIntoView({ behavior: 'smooth' });
}

}
