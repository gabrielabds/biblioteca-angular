import { Component, OnInit } from '@angular/core'; // <-- Adicionado o OnInit aqui
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Livro, Autor } from '../../core/types/types'; // <-- Importado o Autor aqui
import { LivrosService } from '../../core/services/livros.service';
import { AutoresService } from '../../core/services/autores.service'; // <-- Importado o serviço de autores
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- Caso use o @for antigo, mas no Angular moderno o standalone já aceita de boas

@Component({
  selector: 'app-cadastrar',
  standalone: true, // Garanta que isso está aqui se for standalone
  imports: [FormsModule, ReactiveFormsModule, CommonModule], // <-- Adicione o CommonModule aqui por segurança
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent implements OnInit { // <-- Adicionado o "implements OnInit"
  titulo = 'Cadastro de Livros';
  livro: Livro = {} as Livro;
  listaAutores: Autor[] = []; // <-- Array para guardar os autores que existem no sistema

  constructor(
    private service: LivrosService,
    private autoresService: AutoresService, // <-- Injetamos o serviço de autores aqui
    private router: Router
  ) { }

  ngOnInit(): void {
    // Busca a lista de autores do json-server assim que a tela carrega
    this.autoresService.listar().subscribe(autores => {
      this.listaAutores = autores;
    });
  }

  submeter() {
    this.service.incluir(this.livro).subscribe(() => {
      // CORREÇÃO: Mudamos de '/listagem' para '/livros' para bater com as novas rotas
      this.router.navigate(['/livros']); 
    });
  }
}