import { PlayerOverlay } from './../player-overlay.service';
import { Component, OnInit, Input, ElementRef } from '@angular/core';

export interface ZefDropdownItem {
  id: string;
  name: string;
  data: any;
}

@Component({
  selector: 'zef-dropdown',
  templateUrl: './zef-dropdown.component.html',
  styleUrls: ['./zef-dropdown.component.scss']
})
export class ZefDropdown implements OnInit {
  public selected: ZefDropdownItem;

  @Input() items: ZefDropdownItem[];
  @Input() placeholder: string = 'Select an item';
  @Input() disabled: boolean = false;

  constructor(private overlay: PlayerOverlay, private elem: ElementRef) { }

  ngOnInit() {
  }

  onOpenDropdown() {
    this.overlay.openDropdown(this.elem);
  }

}
