import { Component, OnInit } from '@angular/core';
import { Autor } from '../../core/types/types';
import { AutoresService } from '../../core/services/autores.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // boa prática em Standalone para *ngIf, *ngFor etc.

@Component({
  selector: 'app-listagem',
  standalone: true, 
  imports: [CommonModule, RouterModule], // adiciona CommonModule para segurança
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css'] 
})
export class ListagemComponent implements OnInit {
  listaAutores: Autor[] = [];

  constructor(
    private service: AutoresService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarAutores(); 
  }

  carregarAutores(): void {
    this.service.listar().subscribe((autores) => {
      this.listaAutores = autores;
    });
  }

  excluir(id: number): void {
    if (id) {
      this.service.excluir(id).subscribe(() => {
        this.listaAutores = this.listaAutores.filter(autor => autor.id !== id);
      });
    }
  }
}