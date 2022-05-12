import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
  imports: [AuthModule.forRoot({
    config: {
      authority: 'https://dev-jx3neumy.us.auth0.com',
      redirectUrl: window.location.origin,
      clientId: 'lk5IVpjLdoZvibOasX4KdnJdBWtisJja',
      scope: 'openid profile offline_access email',
      responseType: 'code',
      silentRenew: true,
      useRefreshToken: true,
      secureRoutes: ['http://localhost:8080/'],
      customParamsAuthRequest: {
        audience: 'http://localhost:8080'
      }

    }
  })],
  providers: [],
  exports: [AuthModule],
})
export class AuthConfigModule {
}
