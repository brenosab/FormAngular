import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileEditorComponent } from './components/profile-editor/profile-editor.component';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatButtonModule} from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatRadioModule } from '@angular/material/radio';  
import { HttpClientModule } from '@angular/common/http';
import { TableUserEditorComponent } from './components/table-user-editor/table-user-editor.component';
import { UserEditorComponent } from './components/user-editor/user-editor.component';
import { MainPageEditorComponent } from './components/main-page-editor/main-page-editor.component';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent, 
    ProfileEditorComponent, 
    HeaderComponent, 
    FooterComponent, 
    TableUserEditorComponent, 
    UserEditorComponent, MainPageEditorComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatIconModule,
    MDBBootstrapModule.forRoot(),
    MatButtonModule,
    NgbModule,
    MatButtonModule,  
    MatIconModule,  
    MatRadioModule,  
    HttpClientModule,
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'pt-BR' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
