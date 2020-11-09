import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableUserEditorComponent } from './components/table-user-editor/table-user-editor.component';
import { ProfileEditorComponent } from './components/profile-editor/profile-editor.component';


const routes: Routes = [
  { path: 'table', component: TableUserEditorComponent },
  { path: 'home', component: ProfileEditorComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
