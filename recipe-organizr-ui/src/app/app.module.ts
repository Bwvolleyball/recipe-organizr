import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthAppModule} from '../../projects/auth/src/app/auth-app.module';
import { WelcomeComponent } from './welcome/welcome.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { NavigationComponent } from './navigation/navigation.component';
import {UserService} from '../../projects/auth/src/app/user/user.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    AuthAppModule,
    // AppRoutingModule must always be the last module
    AppRoutingModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
