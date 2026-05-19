import { Component, OnInit } from '@angular/core'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Livro, Autor } from '../../core/types/types'; 
import { LivrosService } from '../../core/services/livros.service';
import { AutoresService } from '../../core/services/autores.service'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // <-- Importado o RouterModule
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-cadastrar',
  standalone: true, 
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule], // <-- Adicionado RouterModule
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent implements OnInit { 
  titulo = 'Cadastro de Livros';
  livro: Livro = {} as Livro;
  listaAutores: Autor[] = []; 

  constructor(
    private service: LivrosService,
    private autoresService: AutoresService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.autoresService.listar().subscribe(autores => {
      this.listaAutores = autores;
    });
  }

  submeter() {
    // 1. Garante que os campos numéricos não sejam enviados como texto (evita quebrar a edição depois)
    this.livro.id = Number(this.livro.id);
    this.livro.ano = Number(this.livro.ano);
    this.livro.idAutor = Number(this.livro.idAutor);

    this.service.incluir(this.livro).subscribe({
      next: () => {
        this.router.navigate(['/livros']); 
      },
      error: (err) => {
        // 2. Alerta caso tente cadastrar um ID de livro que já existe
        alert('O json-server recusou o cadastro! Verifique se esse ID de Livro já existe.');
        console.error(err);
      }
    });
  }
}