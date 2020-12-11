import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableUserEditorComponent } from './components/user/table-user-editor/table-user-editor.component';
import { ProfileEditorComponent } from './components/profile-editor/profile-editor.component';
import { UserEditorComponent } from './components/user/user-editor/user-editor.component';
import { MainPageEditorComponent } from './components/main-page-editor/main-page-editor.component';

import { TableProductEditorComponent } from './components/product/table-product-editor/table-product-editor.component';
import { ProductEditorComponent } from './components/product/product-editor/product-editor.component';

const routes: Routes = [
  { path: 'table', component: TableUserEditorComponent },
  { path: 'home', component: ProfileEditorComponent },
  { path: 'user', component: UserEditorComponent },
  { path: '', component: MainPageEditorComponent },
  { path: 'product-table', component: TableProductEditorComponent },
  { path: 'product', component: ProductEditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }