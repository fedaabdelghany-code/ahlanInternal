import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-popover',
  template: `
    <div class="popover-content">
      <p>If you have any questions about the workshop, please contact:</p>
      <p>
        <strong>General Contact:</strong><br>
        <a href="mailto:emily.elias@lafarge.com">emily.elias&#64;lafarge.com</a><br>
        <a href="tel:+201118003559">+20 111 80035 59</a>
      </p>
      <p>
        <strong>Medical Emergency:</strong><br>
        <a href="tel:+201289497654">+20 1289497654</a>
      </p>
      <p>
        <strong>Security Contact:</strong><br>
        <a href="tel:+201118003559">+20 1211958853</a>
      </p>
    </div>
  `,
  styleUrls: ['./contact-popover.component.scss']
})
export class ContactPopoverComponent {}
