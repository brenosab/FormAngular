import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss']
})
export class ProfileEditorComponent implements OnInit {

  profileForm = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    email: new FormControl('', Validators.required),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl('')
    })
  });

  powers = ['Employee', 'Client',
  'Supervisor', 'Manager'];

  user = {} as User;
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  // Chama o serviço para obtém todos os carros
  getUsers() {
    this.userService.getUsers().subscribe((dados: any) => {
      this.users = dados.users;
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
  updateProfile(){
    console.log(this.users);
    // console.log(this.profileForm.controls?.firstName?.touched);
    // this.profileForm.patchValue({
    //   firstName: 'Nancy',
    //   address: {
    //     street: '123 Drew Street'
    //   }
    // });
  }
   // limpa o formulario
   cleanForm(form: NgForm) {
    this.getUsers();
    form.resetForm();
    //this.user = {} as User;
  }
}