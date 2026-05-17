export interface Autor {
  id?: number;
  nome: string;
  nacionalidade: string;
}

export interface Livro {
  id?: number;
  titulo: string;
  ano: number;
  genero: string;
  editora: string;
}
