import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-user-editor',
  templateUrl: './table-user-editor.component.html',
  styleUrls: ['./table-user-editor.component.scss']
})
export class TableUserEditorComponent implements OnInit {

  user = {} as User;
  users: User[];

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.userService.getUsers().subscribe((dados: any) => {
      this.users = dados.usuarios;
    });
  }
  goToDetalhesByService(user){
    this.router.navigate(['/user', { id: user.idUsuario }]);
  }
  
  cleanForm(form: NgForm) {
    this.getUsers();
    form.resetForm();
  }
}