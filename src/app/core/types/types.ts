export interface Autor {
  id: number;
  nome: string;
  nacionalidade: string;
}

export interface Livro {
  id: number;
  titulo: string;
  idAutor: number; // Ligação direta com o ID do Autor
  ano: number;
  genero: string;
  editora: string;
  isbn?: string;       // O ponto de interrogação indica que o campo é opcional 
}