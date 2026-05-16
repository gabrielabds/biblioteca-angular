import { Injectable } from '@angular/core';
import { Autor } from '../types/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutoresService {
  private readonly API = 'http://localhost:3000/autores';
  constructor(private http: HttpClient) { }

  //Faz um GET para pegar todos os autores.
  listar(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.API);
  }

  //Faz um POST com um novo autor para adicionar no banco de dados.
  incluir(autor: Autor): Observable<Autor> {
    return this.http.post<Autor>(this.API, autor);
  }

  //Faz um DELETE para excluir um autor no banco de dados.
  excluir(id: number): Observable<Autor> {
    return this.http.delete<Autor>(this.API + `/${id}`);
  }
  
//Faz um PUT para alterar um autor no banco de dados.
  editar(autor: Autor): Observable<Autor> {
    const url = `${this.API}/${autor.id}`
    return this.http.put<Autor>(url, autor)
  }
  
//Faz um GET para pegar o autor de ID informado.
  buscarPorId(id: number): Observable<Autor | undefined> {
    return this.http.get<Autor>(this.API + `/${id}`);
  }

}