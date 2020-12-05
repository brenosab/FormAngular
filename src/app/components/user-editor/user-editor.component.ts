import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';
import { Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {
  profileForm = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl('',Validators.required),
    cpf: new FormControl('',Validators.required),
    email: new FormControl('', Validators.required),
    dataNascimento: new FormControl(new Date,Validators.required),
    userType: new FormControl(),
    tipoUsuario: new FormControl(0,Validators.required)
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
        console.log(this.user);
        var _userType = "";
        switch (this.user.tipoUsuario) {
          case 1:
            _userType = 'Employee';
            break;
          case 2:
            _userType = 'Client';
            break;
          case 3:
            _userType = 'Supervisor';
            break;
          case 4:
            _userType = 'Manager';
            break;
          default:
            _userType = '';
            break;
        }

        var _date = this.user.dataNascimento.toString().substring(0,10);
        var _date2 = _date.replace("-","/");
        var _date3 = _date2.replace("-","/");
        console.log(_date3);
        
        this.profileForm.setValue({
          id: this.user.idUsuario,
          nome: this.user.nome,
          cpf: this.user.cpf,
          email: this.user.email,
          dataNascimento: new Date(_date3),
          tipoUsuario: this.user.tipoUsuario,
          userType: _userType 
        });
      });
    }
  }

  post(){
    /**** VALIDAÇÃO DOS CAMPOS ****/
    if(this.profileForm.status == "VALID"){
      switch (this.profileForm.value.userType) {
        case 'Employee':
          this.profileForm.setValue({...this.profileForm.value, tipoUsuario: 1 });
          break;
        case 'Client':
          this.profileForm.setValue({...this.profileForm.value, tipoUsuario: 2 });
          break;
        case 'Supervisor':
          this.profileForm.setValue({...this.profileForm.value, tipoUsuario: 3 });
          break;
        case 'Manager':
          this.profileForm.setValue({...this.profileForm.value, tipoUsuario: 4 });
          break;
        default:
          this.profileForm.setValue({...this.profileForm.value, tipoUsuario: 0 });
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
    }else{
      console.log(this.profileForm.value.userType);
      Swal.fire({        
        text:'Preencha todos os campos para finalizar o cadastro',
        icon:'warning',
        width: 400   
      })
    }
  }
}