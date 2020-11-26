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
    email: new FormControl('', Validators.required),
    dataNascimento: new FormControl(new Date),
    userType: new FormControl(),
    TipoUsuario: new FormControl(0)

  });

  powers = ['Employee', 'Client',
  'Supervisor', 'Manager'];

  constructor(private userService: UserService,
    private route: ActivatedRoute) { }

  user: User;

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if(userId !== null){
      this.userService.getUser(userId).subscribe((dados: any) => {
        this.user = dados;
        this.profileForm.setValue({
          id: this.user.id,
          nome: this.user.nome,
          cpf: this.user.cpf
        });
      });
    }
  }

  post(){
    switch (this.profileForm.value.userType) {
      case 'Employee':
        this.profileForm.setValue({...this.profileForm.value, TipoUsuario: 1 });
        break;
      case 'Client':
        this.profileForm.setValue({...this.profileForm.value, TipoUsuario: 2 });
        break;
      case 'Supervisor':
        this.profileForm.setValue({...this.profileForm.value, TipoUsuario: 3 });
        break;
      case 'Manager':
        this.profileForm.setValue({...this.profileForm.value, TipoUsuario: 4 });
        break;
      default:
        this.profileForm.setValue({...this.profileForm.value, TipoUsuario: 0 });
        break;
    }
    this.userService
    .post(this.profileForm.value)
    .subscribe(hero => {
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