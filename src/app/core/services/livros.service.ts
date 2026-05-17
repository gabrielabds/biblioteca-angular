import { Injectable } from '@angular/core';
import { Livro } from '../types/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {
private readonly API = 'http://localhost:3000/livros';
  constructor(private http: HttpClient) { }

  //Faz um GET para pegar todos os livros.
  listar(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.API);
  }

  //Faz um POST com um novo livro para adicionar no banco de dados.
  incluir(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this.API, livro);
  }

  //Faz um DELETE para excluir um livro no banco de dados.
  excluir(id: number): Observable<Livro> {
    return this.http.delete<Livro>(this.API + `/${id}`);
  }
  
//Faz um PUT para alterar um livro no banco de dados.
  editar(livro: Livro): Observable<Livro> {
    const url = `${this.API}/${livro.id}`
    return this.http.put<Livro>(url, livro)
  }
  
//Faz um GET para pegar o livro de ID informado.
  buscarPorId(id: number): Observable<Livro | undefined> {
    return this.http.get<Livro>(this.API + `/${id}`);
  }
}
