import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Importado o Validators aqui:
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
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

    // TRAVA DE SEGURANÇA: Todos os campos principais agora exigem preenchimento
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      ano: ['', Validators.required],
      genero: ['', Validators.required],
      editora: ['', Validators.required],
      isbn: ['', Validators.required],
      idAutor: ['', Validators.required]
    });

    this.autoresService.listar().subscribe(autores => {
      this.listaAutores = autores;

      this.livrosService.buscarPorId(this.idLivro).subscribe(livro => {
        if (livro) {
          const autorCorrespondente = this.listaAutores.find(a => a.id == livro.idAutor);

          this.form.patchValue({
            titulo: livro.titulo,
            ano: livro.ano,
            genero: livro.genero,
            editora: livro.editora,
            isbn: livro.isbn,
            idAutor: autorCorrespondente ? autorCorrespondente.id : livro.idAutor
          });
        }
      });
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const livroAtualizado: Livro = {
        id: this.idLivro, 
        ...this.form.value,
        ano: Number(this.form.value.ano),       
        idAutor: Number(this.form.value.idAutor) 
      };

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