import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { FormsModule } from '@angular/forms';
import { NameEditorComponent } from './components/name-editor/name-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileEditorComponent } from './components/profile-editor/profile-editor.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NameEditorComponent, ProfileEditorComponent],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
