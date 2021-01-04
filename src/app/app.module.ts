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
import { TableUserEditorComponent } from './components/user/table-user-editor/table-user-editor.component';
import { UserEditorComponent } from './components/user/user-editor/user-editor.component';
import { MainPageEditorComponent } from './components/main-page-editor/main-page-editor.component';
import { TableProductEditorComponent } from './components/product/table-product-editor/table-product-editor.component';

import {MatPaginatorModule} from '@angular/material/paginator';

import {MatTableModule} from '@angular/material/table';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ProductEditorComponent } from './components/product/product-editor/product-editor.component';
import { SearchInputComponent } from './components/search-input/search-input.component';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent, 
    ProfileEditorComponent, 
    HeaderComponent, 
    FooterComponent, 
    TableUserEditorComponent, 
    TableProductEditorComponent,
    UserEditorComponent, MainPageEditorComponent, ProductEditorComponent, SearchInputComponent
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
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'pt-BR' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
