import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdentPagePageRoutingModule } from './ident-page-routing.module';

import { IdentPagePage } from './ident-page.page';

import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdentPagePageRoutingModule,
    BrowserModule, ReactiveFormsModule, HttpClientModule,FormsModule
  ],
  declarations: [IdentPagePage]
})
export class IdentPagePageModule {}
