import { ZefDropdownItem } from './../zef-dropdown.component';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { OverlayOrigin } from '@angular/cdk/overlay';
import { UP_ARROW, DOWN_ARROW, ENTER } from '@angular/cdk/keycodes';

import { fromEvent } from 'rxjs/observable/fromEvent';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar/dist/lib/perfect-scrollbar.component';



@Component({
  selector: 'dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenu implements OnInit {
  private onDestroy = new Subject();

  public filteredItems: ZefDropdownItem[] = [];
  public allItems: ZefDropdownItem[] = [];

  public showItems: ZefDropdownItem[] = [];

  @Input() items: ZefDropdownItem[] = [];
  public selectedItem: ZefDropdownItem;

  @Input() filter: string;

  @Input() menuOpen: boolean = false;

  @Input() overlayOrigin: OverlayOrigin;

  @Output() select = new EventEmitter<ZefDropdownItem>();

  @ViewChild('scrollbar') scrollbar: PerfectScrollbarComponent;

  public width: number = 500;
  constructor(private elem: ElementRef) { }

  ngOnInit() {
    fromEvent<KeyboardEvent>(document, 'keyup').pipe(
      filter((event: KeyboardEvent) => event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW),
      takeUntil(this.onDestroy)
    ).subscribe((event: KeyboardEvent) => {
      switch (event.keyCode) {
        case UP_ARROW: this.selectPrevious(); break;
        case DOWN_ARROW: this.selectNext(); break;
      }
    });
  }

  ngOnDestroy() {
    this.onDestroy.next();
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

  selectPrevious() {
    if (this.filteredItems) {
      if (this.selectedItem == null) {
        this.selectedItem = this.filteredItems[0];
      } else {
        let idx = this.filteredItems.findIndex(item => item.value === this.selectedItem.value);
        if (idx > 0) {
          idx--;
        }

        setTimeout(() => {
          const elem = this.elem.nativeElement as HTMLElement;
          const selectedElem = <HTMLElement>elem.querySelector('.selected');

          const scrollRect = elem.getBoundingClientRect();
          const itemRect = selectedElem.getBoundingClientRect();

          if (scrollRect.top > itemRect.top ) {
            this.scrollbar.directiveRef.scrollToY(itemRect.top);
          }
        });

        this.selectedItem = this.filteredItems[idx];
      }
    }
  }

  selectNext() {
    if (this.filteredItems) {
      if (this.selectedItem == null) {
        this.selectedItem = this.filteredItems[0];
      } else {
        let idx = this.filteredItems.findIndex(item => item.value === this.selectedItem.value);
        console.log(this.filteredItems.length);
        if (idx < this.filteredItems.length - 1) {
          idx++;
        }
        // idx = Math.min(idx++, this.filteredItems.length - 1);
        this.selectedItem = this.filteredItems[idx];
      }

      setTimeout(() => {
        const elem = this.elem.nativeElement as HTMLElement;
        const selectedElem = <HTMLElement>elem.querySelector('.selected');

        const scrollRect = elem.getBoundingClientRect();
        const itemRect = selectedElem.getBoundingClientRect();

        if (scrollRect.bottom <= itemRect.bottom ) {
          this.scrollbar.directiveRef.scrollToY(itemRect.bottom);
        }
      });
    }

  }

}
