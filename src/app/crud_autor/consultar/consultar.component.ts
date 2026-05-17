import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // necessário para usar [(ngModel)]
import { AutoresService } from '../../core/services/autores.service';
import { Autor } from '../../core/types/types';

@Component({
  selector: 'app-consultar',
  standalone: true,
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ConsultarComponent {
  idBusca: number | null = null;  // ID digitado no input
  autorEncontrado: Autor | null = null; // autor encontrado
  erroBusca: string = ''; // Mensagem de erro

  constructor(private autoresService: AutoresService) { }

  buscarAutor(): void {
    this.erroBusca = '';
    this.autorEncontrado = null;

    if (this.idBusca != null) {
      //Chama o serviço AutoresService, que faz um GET na API:GET http://localhost:3000/autores/:id
      this.autoresService.buscarPorId(this.idBusca).subscribe({
        //verifica se o autor foi retornado corretamente
        next: (autor) => {
          //Se encontrar o autor, salva em this.autorEncontrado.
          //Isso automaticamente mostra os dados no HTML (*ngIf="autorEncontrado").
          if (autor) {
            this.autorEncontrado = autor;
          } else {
            this.erroBusca = 'Autor não encontrado.';
          }
        },
        //Se o autor não existir (for null ou undefined — dependendo da API), mostra a mensagem abaixo
        error: () => {
          this.erroBusca = 'Erro ao buscar autor.';
        }
      });
    }
  }
}