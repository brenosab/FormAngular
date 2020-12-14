import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {
  profileForm = new FormGroup({
    idProduto: new FormControl(0),
    codigo: new FormControl('',Validators.required),
    descricao: new FormControl('',Validators.required),
    valor: new FormControl('', Validators.required)
  });
  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  product : Product;

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if(productId !== null){
      this.productService.getProduct(productId).subscribe((dados: any) => {
        this.product = dados;
        this.profileForm.setValue({
          idProduto: this.product.idProduto,
          codigo: this.product.codigo,
          descricao: this.product.descricao,
          valor: this.product.valor
        });
      });
    }
  }

  post(){
    /**** VALIDAÇÃO DOS CAMPOS ****/
    if(this.profileForm.status == "VALID"){
      this.productService
      .post(this.profileForm.value)
      .subscribe(data => {
        console.log(data);
        if(data.idProduto !== null){
          Swal.fire(
            'Success',
            'Usuário atualizado.',
            'success'
          ).then((result) =>{
            if(result.isConfirmed){
              window.location.reload();
            }
          })
        }else{
          Swal.fire(
            'Error',
            'Não foi possível atualizar usuário',
            'error'
          ).then((result) =>{
            if(result.isConfirmed){
              window.location.reload();
            }
          })
        }
      });
    }else{
      Swal.fire({        
        text:'Preencha todos os campos para finalizar o cadastro',
        icon:'warning',
        width: 400   
      })
    }
  }
}
