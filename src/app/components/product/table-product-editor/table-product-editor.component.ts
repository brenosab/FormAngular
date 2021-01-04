import { Product } from './../../../models/product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-table-product-editor',
  templateUrl: './table-product-editor.component.html',
  styleUrls: ['./table-product-editor.component.scss']
})
export class TableProductEditorComponent implements OnInit {
  displayedColumns: string[] = ['idProduto', 'codigo', 'descricao', 'valor'];

  product = {} as Product;
  products: Product[] = [];

  defaultPageIndex: number = 1;
  defaultPageSize: number = 5;
  totalItemCount: number = 0;

  constructor(private productService: ProductService,
    private router: Router) { }

  dataSource = new MatTableDataSource<Product>([]);

  ngOnInit(): void {
    this.getProducts(this.defaultPageIndex, this.defaultPageSize);
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  getProducts(pageIndex: number, pageSize: number) {
    this.productService.getProducts(pageIndex, pageSize).subscribe((dados: any) => {
      this.products = dados.produtos;
      this.dataSource = dados.produtos;      
      //metadata
      this.totalItemCount = dados.metaData.totalItemCount;
      this.defaultPageIndex = dados.metaData.pageNumber - 1; 
      this.defaultPageSize = dados.metaData.pageSize;
    });
  }

  goToDetalhesByService(product : Product){
    this.router.navigate(['/product', { id: product.idProduto }]);
  }  

  nextStatePagination(event){
    this.getProducts((event.pageIndex + 1), event.pageSize);
  }

  delete(product : Product){
    this.productService.delete(product.idProduto)
    .subscribe(response =>{
      if(response.idProduto !== null){
        Swal.fire(
          'Success',
          'Produto removido.',
          'success'
        ).then((result) =>{
          if(result.isConfirmed){
            window.location.reload();
          }
        })
      }else{
        Swal.fire(
          'Error',
          'Não foi possível remover o produto',
          'error'
        ).then((result) =>{
          if(result.isConfirmed){
            window.location.reload();
          }
        })
      }
    });
  }

  cleanForm(form: NgForm) {
    this.getProducts(this.defaultPageIndex, this.defaultPageSize);
    form.resetForm();
  }
}