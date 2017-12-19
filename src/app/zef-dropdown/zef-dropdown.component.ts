import { PlayerOverlay } from './../player-overlay.service';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

export interface ZefDropdownItem {
  id: string;
  name: string;
}

@Component({
  selector: 'zef-dropdown',
  templateUrl: './zef-dropdown.component.html',
  styleUrls: ['./zef-dropdown.component.scss']
})
export class ZefDropdown implements OnInit {
  public dropdownRef: any;
  public selected: ZefDropdownItem;

  @Input() items: ZefDropdownItem[];
  @Input() placeholder: string = 'Select an item';
  @Input() disabled: boolean = false;
  isMenuOpen = false;

  @ViewChild('elem')
  public element: ElementRef;

  _positions = [
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
    },
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'bottom',
    },
  ];


  constructor(private overlay: PlayerOverlay) { }

  ngOnInit() {
  }

  onOpenDropdown() {
    this.isMenuOpen = !this.isMenuOpen;
    // if (!this.dropdownRef) {
    //   this.dropdownRef = this.overlay.openDropdown(this.elem, this.items);
    // } else {
    //   this.dropdownRef.close();
    //   this.dropdownRef = null;
    // }
  }

}
