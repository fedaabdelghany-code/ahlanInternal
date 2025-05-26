import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone:false
})
export class TabsPage {
  fabMenuOpen = false;

  constructor(private router: Router) {}

  toggleFabMenu() {
  this.fabMenuOpen = !this.fabMenuOpen;

  // Manually control scroll blocking
  
  if (this.fabMenuOpen) {
    document.body.classList.remove('backdrop-no-scroll'); // Allow scroll
  }
}

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
    this.fabMenuOpen = false;
  }

  ngAfterViewInit() {
  // Ensure scroll is not blocked initially
  document.body.classList.remove('backdrop-no-scroll');
  }
}
