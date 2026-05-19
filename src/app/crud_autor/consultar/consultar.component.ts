import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router'; // <-- Importado o Router e RouterModule
import { AutoresService } from '../../core/services/autores.service';
import { Autor } from '../../core/types/types';

@Component({
  selector: 'app-consultar',
  standalone: true,
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],
  imports: [CommonModule, FormsModule, RouterModule], // <-- Adicionado o RouterModule aqui
})
export class ConsultarComponent {
  idBusca: number | null = null;  
  autorEncontrado: Autor | null = null; 
  erroBusca: string = ''; 

  constructor(
    private autoresService: AutoresService,
    private router: Router // <-- Injetado o Router para navegação
  ) { }

  buscarAutor(): void {
    this.erroBusca = '';
    this.autorEncontrado = null;

    if (this.idBusca != null) {
      this.autoresService.buscarPorId(this.idBusca).subscribe({
        next: (autor) => {
          if (autor) {
            this.autorEncontrado = autor;
          } else {
            this.erroBusca = 'Autor não encontrado.';
          }
        },
        error: () => {
          this.erroBusca = 'Erro ao buscar autor.';
        }
      });
    }
  }

  // <-- NOVA FUNÇÃO PARA EXCLUIR DIRETO DA TELA DE CONSULTA
  excluirAutor(): void {
    if (this.autorEncontrado && this.autorEncontrado.id) {
      // Cria um alerta de confirmação nativo do navegador
      const confirmacao = confirm(`Tem certeza que deseja excluir o autor ${this.autorEncontrado.nome}?`);
      
      if (confirmacao) {
        this.autoresService.excluir(this.autorEncontrado.id).subscribe({
          next: () => {
            alert('Autor excluído com sucesso!');
            this.router.navigate(['/autores']); // Volta pra lista após excluir
          },
          error: (err) => {
            alert('Erro ao excluir o autor.');
            console.error(err);
          }
        });
      }
    }
  }
}