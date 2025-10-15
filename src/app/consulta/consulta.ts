import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButton } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { clienteService } from '../clienteService';
import { Cliente } from '../cadastro/cliente';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-consulta',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButton,
    MatTableModule,
    CommonModule,
  ],
  templateUrl: './consulta.html',
  styleUrl: './consulta.css',
})
export class Consulta implements OnInit {
  listaClientes: Cliente[] = [];
  search: string = '';
  colunasTable: string[] = [
    'id',
    'nome',
    'cpf',
    'dataNascimento',
    'email',
    'acoes',
  ];
  constructor(
    private service: clienteService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  pesquisarClientes() {
    this.listaClientes = this.service.pesquisarClientes(this.search);
  }
  deletarCliente(clienteId: string) {
    let clientDelete = window.confirm('Deseja realmente deletar este cliente?');
    if (clientDelete) {
      this.service.deletarCliente(clienteId);
      this.listaClientes = this.service.pesquisarClientes(this.search);
    }
    this.openSnackBar('Cliente deletado com sucesso!', 'Fechar');
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  irParaEditarCliente(clienteId: string) {
    this.router.navigate(['/cadastro'], { queryParams: { id: clienteId } });
  }
  ngOnInit() {
    this.listaClientes = this.service.pesquisarClientes('');
  }
}
