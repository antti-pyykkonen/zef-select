import { PlayerOverlay } from './../player-overlay.service';
import { Component, OnInit, OnChanges, Input, ElementRef, ViewChild, SimpleChanges, EventEmitter, Output } from '@angular/core';

export interface ZefDropdownItem {
  value: string;
  name: string;
}

@Component({
  selector: 'zef-dropdown',
  templateUrl: './zef-dropdown.component.html',
  styleUrls: ['./zef-dropdown.component.scss']
})
export class ZefDropdown implements OnInit, OnChanges {
  public selectedItem: ZefDropdownItem;
  public filter: string;

  @Input()  items: ZefDropdownItem[];
  @Input()  value: any;

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() placeholder: string = 'Select an item';
  @Input() disabled: boolean = false;

  isMenuOpen = false;

  @ViewChild('elem')
  public element: ElementRef;
  @ViewChild('filterInput')
  public filterElement: ElementRef;

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      const curValue = changes['value'].currentValue;
      if (curValue && this.items) {
        this.selectedItem = this.items.find(item => item.value === curValue);
      }
    }
  }

  ngOnInit() {
  }

  public clear() {
    this.isMenuOpen = false;
    this.filter = null;
  }


  public onDropdownShow() {
    this.isMenuOpen = !this.isMenuOpen;

    setTimeout(() => {
      this.filterElement.nativeElement.focus();
    });
  }

  public onDropdownSelect(newValue: any) {
    this.isMenuOpen = false;
    this.value = newValue;
    this.valueChange.emit(this.value);
  }
}
