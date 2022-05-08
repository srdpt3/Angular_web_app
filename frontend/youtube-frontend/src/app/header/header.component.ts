import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public isUserLoggedIn: boolean | undefined;

  constructor() {
    // authService.isUserLoggedIn.subscribe(value => {
    //   this.isUserLoggedIn = value;
    // });
    // this.isUserLoggedIn = authService.isLoggedIn();
  }


  login() {
    // this.authService.login();
  }

  logout() {
    // this.authService.logout();
    // this.isUserLoggedIn = false;
  }

}
