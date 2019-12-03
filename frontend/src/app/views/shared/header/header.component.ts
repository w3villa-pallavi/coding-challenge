import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	activeItem: string;

  constructor(private router: Router) { 

  	router.events.subscribe(event => {
      if (event instanceof NavigationEnd ) {
        this.activeItem = event.url.split('/')[1];
        this.activeItem = this.activeItem == '' ? 'users' : this.activeItem;
      }
    });
  }

  ngOnInit() {
  }

}
