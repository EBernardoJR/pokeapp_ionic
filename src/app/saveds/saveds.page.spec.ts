import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedsPage } from './saveds.page';

describe('SavedsPage', () => {
  let component: SavedsPage;
  let fixture: ComponentFixture<SavedsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
