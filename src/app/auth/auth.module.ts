import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// HttpClient is the official http client of Angular
import { HttpClientModule } from '@angular/common/http';

// template - based forms we need to Import FormsModule
import { FormsModule } from '@angular/forms';

// Ionic Storage module is used to work with the browser's local storage
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [],
  imports: [
      CommonModule,
      HttpClientModule,
      FormsModule,
      IonicStorageModule.forRoot()
  ]
})
export class AuthModule { }
