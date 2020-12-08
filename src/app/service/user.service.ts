import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';  
import { Observable, throwError } from 'rxjs';  
import { retry, catchError } from 'rxjs/operators';
import { User } from '../models/user'; 
import Swal from 'sweetalert2/dist/sweetalert2.js'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:63364/api/usuario'; // api rest fake
  
  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

   // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

 // Obtem todos os usuários
 getUsers(): Observable<User[]> {
  return this.httpClient.get<User[]>(this.url)
    .pipe(
      retry(2),
      catchError(this.handleError))
}
 // Obtem usuário pelo id
 getUser(id): Observable<User> {
  return this.httpClient.get<User>(`${this.url}/${id}`)
    .pipe(
      retry(2),
      catchError(this.handleError))
}

post(data): Observable<any> {
  return this.httpClient.post<any>(this.url, data)
    .pipe(
      retry(0),
      catchError(this.handleError))
}

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    Swal.fire(
      'Error',
      errorMessage,
      'error'
    )
    return throwError(errorMessage);
  }

  delete(id): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}