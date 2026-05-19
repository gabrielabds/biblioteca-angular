import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Importamos o Validators aqui:
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { AutoresService } from '../../core/services/autores.service';
import { CommonModule } from '@angular/common'; 
import { Autor } from '../../core/types/types';

@Component({
  selector: 'app-alterar',
  standalone: true, 
  templateUrl: './alterar.component.html',
  styleUrls: ['./alterar.component.css'],
  imports: [CommonModule, ReactiveFormsModule], 
})
export class AlterarComponent implements OnInit {
  form!: FormGroup;
  idAutor!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private autoresService: AutoresService
  ) { }

  ngOnInit(): void {
    this.idAutor = Number(this.route.snapshot.paramMap.get('id'));

    // 1. ADICIONAMOS TODOS OS CAMPOS E AS REGRAS DE VALIDAÇÃO AQUI
    this.form = this.fb.group({
      nome: ['', Validators.required],               // Obrigatório
      nacionalidade: ['', Validators.required],      // Obrigatório
      dataNascimento: ['', Validators.required],     // Obrigatório
      orcid: [''],                                   // Opcional
      isni: [''],                                    // Opcional
      codigoCutter: ['']                             // Opcional
    });

    this.autoresService.buscarPorId(this.idAutor).subscribe(autor => {
      if (autor) {
        // 2. GARANTIMOS QUE O ANGULAR PREENCHA TODOS OS CAMPOS NA TELA
        this.form.patchValue({
          nome: autor.nome,
          nacionalidade: autor.nacionalidade,
          dataNascimento: autor.dataNascimento,
          orcid: autor.orcid,
          isni: autor.isni,
          codigoCutter: autor.codigoCutter
        });
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const autorAtualizado: Autor = {
        id: this.idAutor, 
        ...this.form.value 
      };

      this.autoresService.editar(autorAtualizado).subscribe(() => {
        this.router.navigate(['/autores']); 
      });
    }
  }
}