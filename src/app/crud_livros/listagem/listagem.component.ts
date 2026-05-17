import { Component, OnInit } from '@angular/core';
import { Livro, Autor } from '../../core/types/types'; // <-- Importamos "Autor" aqui
import { LivrosService } from '../../core/services/livros.service';
import { AutoresService } from '../../core/services/autores.service'; // <-- Importamos o serviço de autores
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-listagem',
  standalone: true, 
  imports: [CommonModule, RouterModule], 
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css'] 
})
export class ListagemComponent implements OnInit {
  listaLivros: Livro[] = [];
  listaAutores: Autor[] = []; // <-- Criamos o array para armazenar os autores
  
  constructor(
    private service: LivrosService,
    private autoresService: AutoresService, // <-- Injetamos o serviço de autores aqui
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarAutores(); // <-- Busca os autores primeiro
    this.carregarLivros(); 
  }

  carregarAutores(): void {
    this.autoresService.listar().subscribe((autores) => {
      this.listaAutores = autores;
    });
  }

  carregarLivros(): void {
    this.service.listar().subscribe((livros) => {
      this.listaLivros = livros;
    });
  }

  // --- FUNÇÃO QUE O SEU HTML ESTAVA PEDINDO ---
  getNomeAutor(idAutor: any): string {
  // Usando == o JavaScript entende que texto "20" e número 20 são a mesma coisa
  const autorEncontrado = this.listaAutores.find(autor => autor.id == idAutor);
  
  return autorEncontrado ? autorEncontrado.nome : 'Autor não encontrado';
}

  excluir(id: number): void {
    if (id) {
      this.service.excluir(id).subscribe(() => {
        this.listaLivros = this.listaLivros.filter(livro => livro.id !== id);
      });
    }
  }
}