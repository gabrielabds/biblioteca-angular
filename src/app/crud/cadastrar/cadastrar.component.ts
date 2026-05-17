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
    this.service.incluir(this.autor).subscribe(() => {
      this.router.navigate(['/listagem']);
    });
  }

}