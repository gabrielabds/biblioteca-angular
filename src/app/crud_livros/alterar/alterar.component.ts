import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; 
import { LivrosService } from '../../core/services/livros.service';
import { AutoresService } from '../../core/services/autores.service'; 
import { CommonModule } from '@angular/common'; 
import { Autor, Livro } from '../../core/types/types';

@Component({
  selector: 'app-alterar',
  standalone: true, 
  templateUrl: './alterar.component.html',
  styleUrls: ['./alterar.component.css'],
  imports: [CommonModule, ReactiveFormsModule], 
})
export class AlterarComponent implements OnInit {
  form!: FormGroup;
  idLivro!: number;
  listaAutores: Autor[] = []; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private livrosService: LivrosService,
    private autoresService: AutoresService 
  ) { }

  ngOnInit(): void {
    this.idLivro = Number(this.route.snapshot.paramMap.get('id'));

    // Cria o formulário reativo com campos vazios
    this.form = this.fb.group({
      titulo: [''],
      ano: [''],
      genero: [''],
      editora: [''],
      isbn: [''],
      idAutor: ['']
    });

    // 1. PASSO ALTERADO: Busca primeiro todos os autores para popular o select
    this.autoresService.listar().subscribe(autores => {
      this.listaAutores = autores;

      // 2. PASSO ALTERADO: Só busca os dados do livro após a lista de autores já estar na tela
      this.livrosService.buscarPorId(this.idLivro).subscribe(livro => {
        if (livro) {
          
          // Procura o autor correspondente usando '==' para evitar o erro de texto vs número
          const autorCorrespondente = this.listaAutores.find(a => a.id == livro.idAutor);

          this.form.patchValue({
            titulo: livro.titulo,
            ano: livro.ano,
            genero: livro.genero,
            editora: livro.editora,
            isbn: livro.isbn,
            // Injeta o ID numérico correto para o Angular conseguir marcar a opção no HTML
            idAutor: autorCorrespondente ? autorCorrespondente.id : livro.idAutor
          });
        }
      });

    });
  }

  onSubmit() {
    if (this.form.valid) {
      // Montamos o objeto garantindo que os campos numéricos sejam convertidos de vez
      const livroAtualizado: Livro = {
        id: this.idLivro, 
        ...this.form.value,
        ano: Number(this.form.value.ano),       
        idAutor: Number(this.form.value.idAutor) 
      };

      // Envia a atualização para o json-server
      this.livrosService.editar(livroAtualizado).subscribe({
        next: () => {
          this.router.navigate(['/livros']); 
        },
        error: (err) => {
          alert('Erro ao salvar! Verifique o console do navegador.');
          console.error(err);
        }
      });
    }
  }
}