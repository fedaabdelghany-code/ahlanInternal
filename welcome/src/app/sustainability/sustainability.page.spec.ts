import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SustainabilityPage } from './sustainability.page';

describe('SustainabilityPage', () => {
  let component: SustainabilityPage;
  let fixture: ComponentFixture<SustainabilityPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SustainabilityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
