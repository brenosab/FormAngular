import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-table-product-editor',
  templateUrl: './table-product-editor.component.html',
  styleUrls: ['./table-product-editor.component.scss']
})
export class TableProductEditorComponent implements OnInit {

  product = {} as Product;
  products: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.productService.getProducts().subscribe((dados: any) => {
      this.products = dados;
    });
  }

  cleanForm(form: NgForm) {
    this.getUsers();
    form.resetForm();
  }
}