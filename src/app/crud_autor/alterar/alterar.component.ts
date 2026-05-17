import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // <-- Importar aqui
import { AutoresService } from '../../core/services/autores.service';
import { CommonModule } from '@angular/common'; // <-- (opcional, mas geralmente precisa)
import { Autor } from '../../core/types/types';

@Component({
  selector: 'app-alterar',
  standalone: true, // <-- importante em standalone
  templateUrl: './alterar.component.html',
  styleUrls: ['./alterar.component.css'],
  imports: [CommonModule, ReactiveFormsModule], // <-- Adicionar ReactiveFormsModule aqui
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

    //Cria um objeto do tipo formulário com os campos vazios (nome e nacionalidade)
    this.form = this.fb.group({
      nome: [''],
      nacionalidade: ['']
    });

    //Chama o serviço que vai buscar os dados do autor pelo ID na API (GET /autor/:id).
    this.autoresService.buscarPorId(this.idAutor).subscribe(autor => {
      //Se o cliente foi encontrado, atualiza os valores do formulário com os dados do cliente encontrado.
      if (autor) {
        this.form.patchValue({
          nome: autor.nome,
          nacionalidade: autor.nacionalidade
        });
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const autorAtualizado: Autor = {
        id: this.idAutor, //pega o ID obtido da URL e que está em this.idAutor
        ...this.form.value //pega o conteúdos dos campos do form e carrega no objetoclienteAtualizado
      };

      /* vai gerar algo como mostrado abaixo e armazenar em clienteAtualizado
      {
        id: 5,     // Capturado da URL (não vem do formulário!)
        nome: "João",
        email: "joao@email.com",
        telefone: "12345-6789"
      }
      */

      this.autoresService.editar(autorAtualizado).subscribe(() => {
        this.router.navigate(['/autores']); // Navega de volta para a listagem de autores após a atualização
      });
    }
  }
}