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
  });

  user: User;
  product: Product;

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
        produto: this.product.codigo + " - " + this.product.descricao
      });
    });
  }
}