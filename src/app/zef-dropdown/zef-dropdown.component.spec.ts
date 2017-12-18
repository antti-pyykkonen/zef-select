import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZefDropdown } from './zef-dropdown.component';

describe('ZefDropdownComponent', () => {
  let component: ZefDropdown;
  let fixture: ComponentFixture<ZefDropdown>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZefDropdown ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZefDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
