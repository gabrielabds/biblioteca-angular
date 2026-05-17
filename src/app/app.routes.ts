import { Routes } from '@angular/router';

// Imporando Livros com apelidos (as ...)
import { CadastrarComponent as CadastrarLivroComponent } from './crud_livros/cadastrar/cadastrar.component';
import { ConsultarComponent as ConsultarLivroComponent } from './crud_livros/consultar/consultar.component';
import { AlterarComponent as AlterarLivroComponent } from './crud_livros/alterar/alterar.component';
import { ExcluirComponent as ExcluirLivroComponent } from './crud_livros/excluir/excluir.component';
import { ListagemComponent as ListagemLivroComponent } from './crud_livros/listagem/listagem.component';

// Importando Autores com apelidos (as ...)
import { CadastrarComponent as CadastrarAutorComponent } from './crud_autor/cadastrar/cadastrar.component';
import { ConsultarComponent as ConsultarAutorComponent } from './crud_autor/consultar/consultar.component';
import { AlterarComponent as AlterarAutorComponent } from './crud_autor/alterar/alterar.component';
import { ExcluirComponent as ExcluirAutorComponent } from './crud_autor/excluir/excluir.component';
import { ListagemComponent as ListagemAutorComponent } from './crud_autor/listagem/listagem.component';

export const routes: Routes = [
  // Rota inicial (pode redirecionar para a listagem de livros, por exemplo)
  { path: '', redirectTo: 'livros', pathMatch: 'full' },

  // --- ROTAS DE LIVROS ---
  { path: 'livros', component: ListagemLivroComponent, title: 'Listagem de Livros' },
  { path: 'livros/cadastrar', component: CadastrarLivroComponent, title: 'Cadastrar Livro' },
  { path: 'livros/consultar', component: ConsultarLivroComponent },
  { path: 'livros/alterar/:id', component: AlterarLivroComponent },
  { path: 'livros/excluir', component: ExcluirLivroComponent },

  // --- ROTAS DE AUTORES ---
  { path: 'autores', component: ListagemAutorComponent, title: 'Listagem de Autores' },
  { path: 'autores/cadastrar', component: CadastrarAutorComponent, title: 'Cadastrar Autor' },
  { path: 'autores/consultar', component: ConsultarAutorComponent },
  { path: 'autores/alterar/:id', component: AlterarAutorComponent },
  { path: 'autores/excluir', component: ExcluirAutorComponent },

  // Se digitar um link quebrado, redireciona para livros
  { path: '**', redirectTo: 'livros' }  
];