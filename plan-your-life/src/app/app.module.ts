import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatFormFieldModule, MatDialogModule, MatInputModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { UserPromptComponent } from './user-prompt/user-prompt.component';
import { EventListComponent } from './event-list/event-list.component';
import { AppSignInComponent, AuthKeyPopup } from './app-sign-in/app-sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    UserPromptComponent,
    EventListComponent,
    AppSignInComponent,
    AuthKeyPopup,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    
  ],
  entryComponents: [
    AuthKeyPopup
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
construcor(){} }
