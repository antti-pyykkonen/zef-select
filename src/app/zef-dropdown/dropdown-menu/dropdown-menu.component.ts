import { ZefDropdownItem } from './../zef-dropdown.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OverlayOrigin } from '@angular/cdk/overlay';

@Component({
  selector: 'dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenu implements OnInit {
  public filteredItems: ZefDropdownItem[] = [];
  public allItems: ZefDropdownItem[] = [];

  public showItems: ZefDropdownItem[] = [];

  @Input() items: ZefDropdownItem[] = [];
  @Input() selected: string;
  @Input() filter: string;

  @Input() menuOpen: boolean = false;

  @Input() overlayOrigin: OverlayOrigin;

  @Output() select = new EventEmitter<ZefDropdownItem>();

  public width: number = 500;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (this.overlayOrigin) {
      this.width = this.overlayOrigin.elementRef.nativeElement.offsetWidth;
    }

    if (changes['items']) {
      const items = changes['items'].currentValue;
      this.allItems = items;
    }

    if (changes['filter'] && this.allItems) {
      const filter = changes['filter'].currentValue as string;
      if (filter != null) {
        this.filteredItems = this.allItems.filter(x => x.name.toUpperCase().includes(filter.toUpperCase()));
      } else {
        this.filteredItems = this.allItems;
      }
    }
  }

}
