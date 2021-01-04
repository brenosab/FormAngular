import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  _message = new FormGroup({
    nome: new FormControl('',Validators.required)
  });

  @Input() label: string;
  @Input() placeholder: string = "First Name";
  @Input() type : string = "text";

  @Input()
  set message(newMessage: FormGroup) {
    this._message = newMessage;
  }
  get message() {
    return this._message;
  }

  onClick(){
    console.log(this._message.value);
  }
}