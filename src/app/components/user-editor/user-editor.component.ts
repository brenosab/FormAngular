import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {

  profileForm = new FormGroup({
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
        nome: this.user.nome,
        cpf: this.user.cpf
      });
    });
  }
}