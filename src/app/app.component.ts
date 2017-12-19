import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isMenuOpen  = false;

  public items = [
    {name: 'A', id: 1},
    {name: 'B', id: 2},
    {name: 'C', id: 3},
    {name: 'D', id: 4},
    {name: 'E', id: 5},
    {name: 'F', id: 6},
    {name: 'G', id: 7},
    {name: 'H', id: 8},
    {name: 'I', id: 9},
    {name: 'J', id: 10},
    {name: 'K', id: 11},
  ];
}
