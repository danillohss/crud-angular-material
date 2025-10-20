export interface UF {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
}

export interface Municipio {
  nome: string;
  codigo_ibge: string;
}
