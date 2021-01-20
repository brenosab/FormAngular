import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { ProductService } from '../../../service/product.service';
import { User } from '../../../models/user';
import { Product } from '../../../models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buy-editor',
  templateUrl: './buy-editor.component.html',
  styleUrls: ['./buy-editor.component.scss']
})
export class BuyEditorComponent implements OnInit {
  profileForm = new FormGroup({
    usuario: new FormControl('',Validators.required),
    produto: new FormControl('',Validators.required),
    descricao: new FormControl('',Validators.required),
    quantidade: new FormControl('',Validators.required),
  });

  user: User;  
  product: Product;
  productList: Product[];
  quantidades: number[];

  constructor(private userService: UserService,
    private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  getUser(){
    this.userService.getUser(this.profileForm.value.usuario).subscribe((dados: any) => {
      this.user = dados;
      this.profileForm.setValue({
        ...this.profileForm.value,
        usuario: this.user.idUsuario + " - " + this.user.nome
      });
    });
  }
  getProduct(){
    this.productService.getProduct(this.profileForm.value.produto).subscribe((dados: any) => {
      this.product = dados;
      this.profileForm.setValue({
        ...this.profileForm.value,
        produto: dados.codigo + " - " + dados.descricao
      });
    });
  }
  addProductList(){
    console.log(this.product);
    console.log(this.productList);
    console.log(this.profileForm.value.quantidade);
    if(this.profileForm.value.produto !== '' && this.profileForm.value.quantidade !== ''){
      if(this.productList === undefined || !this.productList.includes(this.product)){
        this.productList.push(this.product);
        this.quantidades.push(this.profileForm.value.quantidade);
      }
    }else{
      console.log('teste');
    }
  }
}