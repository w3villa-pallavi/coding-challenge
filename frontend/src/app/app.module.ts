import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './views/users/users.component';
import { JobsComponent } from './views/jobs/jobs.component';
import { HeaderComponent } from './views/shared/header/header.component';

import { UserService } from './services/user.service';

import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorPopupComponent } from './views/shared/error-popup/error-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    JobsComponent,
    HeaderComponent,
    ErrorPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
