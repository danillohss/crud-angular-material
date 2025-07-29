import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root',
})
export class clienteService {
  static REPO_CLIENTES = '_CLIENTES';
  salvar(cliente: Cliente) {
    const storage = this.obterStorage();
    storage.push(cliente);
    localStorage.setItem(clienteService.REPO_CLIENTES, JSON.stringify(storage));
  }
  pesquisarClientes(nome: string): Cliente[] {
    const clientes = this.obterStorage();
    if (!nome) {
      return clientes;
    } else {
      return clientes.filter(
        (cliente: Cliente) =>
          cliente.nome?.toLowerCase().indexOf(nome.toLowerCase()) !== -1
      );
    }
  }

  buscarClientePorId(id: string) {
    const clientes = this.obterStorage();
    return clientes.find((cliente: Cliente) => cliente.id === id);
  }

  private obterStorage(): Cliente[] {
    const repoClientes = localStorage.getItem(clienteService.REPO_CLIENTES);
    if (repoClientes) {
      const clientes = JSON.parse(repoClientes);
      return clientes;
    }
    const clientes: Cliente[] = [];
    localStorage.setItem(
      clienteService.REPO_CLIENTES,
      JSON.stringify(clientes)
    );
    return clientes;
  }
}
