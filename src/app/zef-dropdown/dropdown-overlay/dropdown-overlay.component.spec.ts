import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownOverlay } from './dropdown-overlay.component';

describe('DropdownOverlayComponent', () => {
  let component: DropdownOverlay;
  let fixture: ComponentFixture<DropdownOverlay>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownOverlay ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownOverlay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
