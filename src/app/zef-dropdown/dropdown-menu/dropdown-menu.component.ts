import { ZefDropdownItem } from './../zef-dropdown.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OverlayOrigin } from '@angular/cdk/overlay';

@Component({
  selector: 'dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenu implements OnInit {
  @Input() items: ZefDropdownItem[];
  @Input() selected: string;

  @Input() menuOpen: boolean = false;

  @Input() overlayOrigin: OverlayOrigin;

  @Output() select = new EventEmitter<ZefDropdownItem>();

  public width: number = 500;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.overlayOrigin) {
      this.width = this.overlayOrigin.elementRef.nativeElement.offsetWidth;
    }
  }

}
