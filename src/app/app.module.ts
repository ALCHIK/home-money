import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import {UsersService} from './shared/services/users.service';
import {AuthService} from './shared/services/auth.service';
import {AuthGuard} from './shared/services/auth.guard';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxChartsModule//for graph

  ],
  providers: [
    UsersService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

//если ошибка ERROR in node_modules/rxjs-compat/operator/shareReplay.d.ts(2,10): error TS2305: Module '"../../rxjs/internal-compatibility"' has no exported member 'ShareReplayConfig'.
// надо понизить версию rx    npm install rxjs-compat@6.3.3 --s

// чтбы подключить scss sudo npm install bootstrap-sass --save sudo npm install bootstrap-scss --save b ghjgbcfnm angular.json
