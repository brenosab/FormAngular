import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { User } from '../../../models/user';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-user-editor',
  templateUrl: './table-user-editor.component.html',
  styleUrls: ['./table-user-editor.component.scss']
})
export class TableUserEditorComponent implements OnInit {

  user = {} as User;
  users: User[];

  defaultPageIndex: number = 1;
  defaultPageSize: number = 5;
  totalItemCount: number = 0;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router ) { }

  dataSource = new MatTableDataSource<User>([]);

  ngOnInit(): void {
    this.getUsers(this.defaultPageIndex, this.defaultPageSize);
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  getUsers(pageIndex: number, pageSize: number) {
    this.userService.getUsers(pageIndex, pageSize).subscribe((dados: any) => {
      this.users = dados.usuarios;
      this.dataSource = dados.usuarios;      
      //metadata
      this.totalItemCount = dados.metaData.totalItemCount;
      this.defaultPageIndex = dados.metaData.pageNumber - 1; 
      this.defaultPageSize = dados.metaData.pageSize;
    });
  }

  goToDetalhesByService(user){
    this.router.navigate(['/user', { id: user.idUsuario }]);
  }

    nextStatePagination(event){
    this.getUsers((event.pageIndex + 1), event.pageSize);
  }
  
  delete(user : User){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(user.idUsuario)
        .subscribe(response =>{
          if(response.idUsuario !== null){
            Swal.fire(
              'Success',
              'Usuário removido.',
              'success'
            ).then((result) =>{
              if(result.isConfirmed){
                window.location.reload();
              }
            })
          }else{
            Swal.fire(
              'Error',
              'Não foi possível remover o usuário',
              'error'
            ).then((result) =>{
              if(result.isConfirmed){
                window.location.reload();
              }
            })
          }
        });
      }
    });
  }

  cleanForm(form: NgForm) {
    this.getUsers(this.defaultPageIndex, this.defaultPageSize);
    form.resetForm();
  }
}