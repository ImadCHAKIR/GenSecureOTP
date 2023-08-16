import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AuthPagePage } from './auth-page.page';

import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthPagePageRoutingModule } from './auth-page-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPagePageRoutingModule,
    ReactiveFormsModule, HttpClientModule
  ],
  declarations: [AuthPagePage]
})
export class AuthPagePageModule {}
