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
    {name: 'A', value: 1},
    {name: 'B', value: 2},
    {name: 'C', value: 3},
    {name: 'D', value: 4},
    {name: 'E', value: 5},
    {name: 'F', value: 6},
    {name: 'G', value: 7},
    {name: 'H', value: 8},
    {name: 'I', value: 9},
    {name: 'J', value: 10},
    {name: 'K', value: 11}
  ];
}
