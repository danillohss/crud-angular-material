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
  obterStorage(): Cliente[] {
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
