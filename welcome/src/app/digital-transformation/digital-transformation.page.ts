import { Component } from '@angular/core';

@Component({
  selector: 'app-digital-transformation',
  templateUrl: './digital-transformation.page.html',
  styleUrls: ['./digital-transformation.page.scss'],
  standalone: false,
})
export class DigitalTransformationPage {
  images = [
    { src: 'assets/ai-powered-cement-plants.png', alt: 'AI-powered cement plant', title: 'Digital Transformation' },
  ];

  currentImageIndex = 0;

  selectedImage: { src: string; alt: string } | null = null;

  openImage(src: string, alt: string): void {
    this.selectedImage = { src, alt };
  }

  closeImage(): void {
    this.selectedImage = null;
  }
}
