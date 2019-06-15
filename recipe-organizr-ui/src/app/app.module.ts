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
import {CarouselModule} from 'ngx-bootstrap/carousel';
import { FooterComponent } from './footer/footer.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import {RecipeAppModule} from '../../projects/recipe/src/app/recipe-app.module';
import {FormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    NavigationComponent,
    FooterComponent,
    SearchBoxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    CarouselModule.forRoot(),
    AuthAppModule,
    RecipeAppModule,
    // AppRoutingModule must always be the last module
    AppRoutingModule
  ],
  providers: [
    UserService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
