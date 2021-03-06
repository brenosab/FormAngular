import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';  
import { Observable, throwError } from 'rxjs';  
import { retry, catchError } from 'rxjs/operators';
import { Product } from '../models/product'; 
import Swal from 'sweetalert2/dist/sweetalert2.js'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'http://localhost:63364/api/produto'; // api rest fake

  constructor(private httpClient : HttpClient) { }

   // Headers
   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getProducts(pageIndex: number, pageSize: number): Observable<Product[]>{
    return this.httpClient.get<Product[]>
    (`${this.url}/?pageIndex=${pageIndex}&pageSize=${pageSize}`)
    .pipe(
      retry(2),
      catchError(this.handleError))
  }

  _url : string;
   // Obtem usuário pelo id
  getProduct(id): Observable<Product> {
    if(Number.isInteger(Number.parseInt(id)))
      this._url = `${this.url}/id?id=${id}`
    else
      this._url = `${this.url}/id?descricao=${id}`

    return this.httpClient.get<Product>(this._url)
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
  
  put(id, data): Observable<any> {
    return this.httpClient.put(`${this.url}/${id}`, data)
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