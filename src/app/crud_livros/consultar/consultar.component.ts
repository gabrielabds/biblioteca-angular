import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router'; // <-- Importado o Router e RouterModule
import { LivrosService } from '../../core/services/livros.service';
import { AutoresService } from '../../core/services/autores.service'; 
import { Livro, Autor } from '../../core/types/types'; 

@Component({
  selector: 'app-consultar',
  standalone: true,
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],
  imports: [CommonModule, FormsModule, RouterModule], // <-- Adicionado o RouterModule aqui
})
export class ConsultarComponent implements OnInit { 
    idBusca: number | null = null;  
    livroEncontrado: Livro | null = null; 
    erroBusca: string = ''; 
    listaAutores: Autor[] = []; 
  
    constructor(
      private livrosService: LivrosService,
      private autoresService: AutoresService,
      private router: Router // <-- Injetado o Router para redirecionamento
    ) { }

    ngOnInit(): void {
      this.autoresService.listar().subscribe(autores => {
        this.listaAutores = autores;
      });
    }
  
    buscarLivro(): void {
      this.erroBusca = '';
      this.livroEncontrado = null;
  
      if (this.idBusca != null) {
        this.livrosService.buscarPorId(this.idBusca).subscribe({
          next: (livro) => {
            if (livro) {
              this.livroEncontrado = livro;
            } else {
              this.erroBusca = 'Livro não encontrado.';
            }
          },
          error: () => {
            this.erroBusca = 'Erro ao buscar livro.';
          }
        });
      }
    }

    getNomeAutor(idAutor: any): string {
      const autorEncontrado = this.listaAutores.find(autor => autor.id == idAutor);
      return autorEncontrado ? autorEncontrado.nome : 'Autor não encontrado';
    }

    // <-- NOVA FUNÇÃO PARA EXCLUIR DIRETO DA TELA DE CONSULTA
    excluirLivro(): void {
      if (this.livroEncontrado && this.livroEncontrado.id) {
        const confirmacao = confirm(`Tem certeza que deseja excluir o livro "${this.livroEncontrado.titulo}"?`);
        
        if (confirmacao) {
          this.livrosService.excluir(this.livroEncontrado.id).subscribe({
            next: () => {
              alert('Livro excluído com sucesso!');
              this.router.navigate(['/livros']); // Volta para a listagem de livros
            },
            error: (err) => {
              alert('Erro ao excluir o livro.');
              console.error(err);
            }
          });
        }
      }
    }
}