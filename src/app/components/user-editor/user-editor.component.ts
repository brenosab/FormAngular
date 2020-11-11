import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';
import { Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {

  profileForm = new FormGroup({
    id: new FormControl('',Validators.required),
    nome: new FormControl('',Validators.required),
    cpf: new FormControl('',Validators.required),
  });

  constructor(private userService: UserService,
    private route: ActivatedRoute) { }

  user: User;

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(userId).subscribe((dados: any) => {
      this.user = dados;
      this.profileForm.setValue({
        id: this.user.id,
        nome: this.user.nome,
        cpf: this.user.cpf
      });
    });
  }

  post(){
    this.userService
      .post(this.profileForm.value)
      .subscribe(hero => {
        console.log(hero.dados);

        if(hero.dados === "OK"){
          Swal.fire(
            'Success',
            'Usuário atualizado.',
            'success'
          )
        }else{
          Swal.fire(
            'Error',
            'Não foi possível atualizar usuário',
            'error'
          )
        }
      });
  }
}