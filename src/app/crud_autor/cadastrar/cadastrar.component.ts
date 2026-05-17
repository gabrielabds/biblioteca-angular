import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Autor } from '../../core/types/types';
import { AutoresService } from '../../core/services/autores.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent {
  titulo = 'Cadastro de Autores';
  autor: Autor = {} as Autor;

  constructor(
    private service: AutoresService,
    private router: Router
  ) { }

  submeter() {
    // Garante que o ID digitado vá como número puro para o json-server
    this.autor.id = Number(this.autor.id);

    this.service.incluir(this.autor).subscribe({
      next: () => {
        // Se der certo, volta para a lista de autores
        this.router.navigate(['/autores']); 
      },
      error: (err) => {
        // Se o json-server recusar (por ID duplicado ou servidor desligado), esse alerta avisa:
        alert('O json-server recusou o cadastro! Verifique se esse ID de Autor já existe ou se o servidor caiu.');
        console.error(err);
      }
    });
  }

}