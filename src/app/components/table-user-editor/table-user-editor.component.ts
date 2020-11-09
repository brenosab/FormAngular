import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-table-user-editor',
  templateUrl: './table-user-editor.component.html',
  styleUrls: ['./table-user-editor.component.scss']
})
export class TableUserEditorComponent implements OnInit {

  user = {} as User;
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.userService.getUsers().subscribe((dados: any) => {
      this.users = dados.users;
    });
  }
  
  cleanForm(form: NgForm) {
    this.getUsers();
    form.resetForm();
    //this.user = {} as User;
  }
}