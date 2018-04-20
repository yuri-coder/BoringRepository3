import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';

import { PetService } from "./pet.service";

import { AppComponent } from './app.component';
import { AllpetsComponent } from './allpets/allpets.component';
import { AddpetComponent } from './addpet/addpet.component';
import { EditpetComponent } from './editpet/editpet.component';
import { PetinfoComponent } from './petinfo/petinfo.component';


@NgModule({
  declarations: [
    AppComponent,
    AllpetsComponent,
    AddpetComponent,
    EditpetComponent,
    PetinfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    PetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
