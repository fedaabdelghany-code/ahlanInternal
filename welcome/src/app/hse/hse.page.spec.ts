import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HsePage } from './hse.page';

describe('HsePage', () => {
  let component: HsePage;
  let fixture: ComponentFixture<HsePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
