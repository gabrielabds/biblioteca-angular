import { Component, OnInit } from '@angular/core'; // <-- 1. IMPORTADO O ONINIT HERE
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { LivrosService } from '../../core/services/livros.service';
import { AutoresService } from '../../core/services/autores.service'; // <-- 2. IMPORTADO O SERVIÇO DE AUTORES
import { Livro, Autor } from '../../core/types/types'; // <-- 3. IMPORTADO O TIPO AUTOR

@Component({
  selector: 'app-consultar',
  standalone: true,
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ConsultarComponent implements OnInit { // <-- 4. ADICIONADO O IMPLEMENTS ONINIT
    idBusca: number | null = null;  
    livroEncontrado: Livro | null = null; 
    erroBusca: string = ''; 
    listaAutores: Autor[] = []; // <-- 5. ARRAY PARA GUARDAR OS AUTORES DO BANCO
  
    constructor(
      private livrosService: LivrosService,
      private autoresService: AutoresService // <-- 6. INJETADO O SERVIÇO DE AUTORES
    ) { }

    ngOnInit(): void {
      // 7. ASSIM QUE A TELA ABRE, CARREGA OS AUTORES PARA DEIXAR NA MEMÓRIA
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

    // <-- 8. FUNÇÃO QUE FAZ O CRUZAMENTO DE DADOS QUE O SEU HTML PEDIU
    getNomeAutor(idAutor: any): string {
      // Procura na lista o autor correspondente usando o '==' flexível
      const autorEncontrado = this.listaAutores.find(autor => autor.id == idAutor);
      
      // Retorna o nome se achar, ou avisa caso não encontre
      return autorEncontrado ? autorEncontrado.nome : 'Autor não encontrado';
    }
}