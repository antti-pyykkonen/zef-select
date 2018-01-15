import { ZefDropdownItem } from './../zef-dropdown.component';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { OverlayOrigin } from '@angular/cdk/overlay';
import { UP_ARROW, DOWN_ARROW, ENTER, ESCAPE } from '@angular/cdk/keycodes';

import { fromEvent } from 'rxjs/observable/fromEvent';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';

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
  public selectedItem: ZefDropdownItem;

  @Input() items: ZefDropdownItem[] = [];

  @Input() selected: ZefDropdownItem;

  @Input() filter: string;

  @Input() menuOpen: boolean = false;

  @Input() overlayOrigin: OverlayOrigin;

  @Output() select = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();


  @ViewChild('scrollbar') scrollbar: PerfectScrollbarComponent;

  public width: number = 500;
  constructor(private elem: ElementRef) { }

  ngOnInit() {    
    this.selectedItem = this.selected;

    const listenedEvents = [UP_ARROW, DOWN_ARROW, ENTER, ESCAPE];

    fromEvent<KeyboardEvent>(document, 'keydown').pipe(
      filter((event: KeyboardEvent) => listenedEvents.includes(event.keyCode)),
      takeUntil(this.onDestroy)
    ).subscribe((event: KeyboardEvent) => {
      console.log(event.keyCode);
      switch (event.keyCode) {
        case UP_ARROW:    this.selectPrevious(); this.onActiveChange(); break;
        case DOWN_ARROW:  this.selectNext(); this.onActiveChange(); break;
        case ENTER:       this.select.emit(this.selectedItem.value); break;
        case ESCAPE:      this.close.emit(); break;
      }
    });
  }

  ngAfterViewInit() {
    this.onActiveChange(0);
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

        if (idx < this.filteredItems.length - 1) {
          idx++;
        }
        // idx = Math.min(idx++, this.filteredItems.length - 1);
        this.selectedItem = this.filteredItems[idx];
      }
    }
  }

  onActiveChange(speed: number = 50) {
    if (this.selectedItem) {
      setTimeout(() => {
        const geometry = this.scrollbar.directiveRef.geometry('offset');
        const elem = this.elem.nativeElement as HTMLElement;
        const selectedElem = <HTMLElement>elem.querySelector('.selected');
  
        const top = selectedElem.offsetTop;
        const pos = Math.max(0, top - (geometry.h / 2) + 20);
  
        this.scrollbar.directiveRef.scrollToY(pos, speed);
      });
    }
  }
}
