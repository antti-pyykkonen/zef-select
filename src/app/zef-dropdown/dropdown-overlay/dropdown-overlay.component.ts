import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-overlay',
  templateUrl: './dropdown-overlay.component.html',
  styleUrls: ['./dropdown-overlay.component.scss']
})
export class DropdownOverlay implements OnInit {
  @Input() selected: string;
  @Input() items: any[];

  constructor() { }

  ngOnInit() {
  }

}
