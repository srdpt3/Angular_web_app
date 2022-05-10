import {Component, OnInit} from '@angular/core';
import {OidcSecurityService} from "angular-auth-oidc-client";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn : boolean = false

  constructor(private oidcSecurityService: OidcSecurityService) {
    // oidcSecurityService.isUserLoggedIn.subscribe(value => {
    //   this.isUserLoggedIn = value;
    // });
    // this.isUserLoggedIn = oidcSecurityService.isLoggedIn();
  }

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(({isAuthenticated}) => {
        this.isUserLoggedIn = isAuthenticated;
    })
  }

  login() {
    this.oidcSecurityService.authorize();

  }

  logout() {
    this.oidcSecurityService.logoffAndRevokeTokens();

  }


}
