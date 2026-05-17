import { Routes } from '@angular/router';
import { CadastrarComponent } from './crud/cadastrar/cadastrar.component';
import { ConsultarComponent } from './crud/consultar/consultar.component';
import { AlterarComponent } from './crud/alterar/alterar.component';
import { ExcluirComponent } from './crud/excluir/excluir.component';
import { ListagemComponent } from './crud/listagem/listagem.component';

export const routes: Routes = [
  { path: '', component: ListagemComponent },
  { path: 'cadastrar', component: CadastrarComponent, title:'Cadastrar' },
  { path: 'consultar', component: ConsultarComponent },
  { path: 'alterar/:id', component: AlterarComponent },
  { path: 'excluir', component: ExcluirComponent },
  { path: 'listagem', component: ListagemComponent },
  { path: '**', redirectTo: 'consultar' }  // se clicar em link quebrado, abra o componente consultar
];