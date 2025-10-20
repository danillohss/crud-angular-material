import {
  Component,
  OnInit,
  Inject,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { Cliente } from './cliente';
import { clienteService } from '../clienteService';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrasilapiService } from '../brasilapiService';
import { Municipio, UF } from '../brasilapi.models';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
@Component({
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButton,
    MatSelectModule,
    NgxMaskDirective,
    CommonModule,
  ],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro implements OnInit {
  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  UFs: UF[] = [];
  municipios: Municipio[] = [];
  constructor(
    private service: clienteService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private BrasilapiService: BrasilapiService
  ) {}

  async salvarCliente() {
    if (!this.atualizando) {
      await this.service.salvar(this.cliente);
      this.openSnackBar('Cliente salvo com sucesso!', 'Fechar');
    } else {
      await this.service.atualizarCliente(this.cliente);
      this.openSnackBar('Cliente atualizado com sucesso!', 'Fechar');
    }
    this.cliente = Cliente.newCliente();
    this.router.navigate(['/consulta']);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  getUFs() {
    return this.BrasilapiService.getUFs().subscribe((data: UF[]) => {
      next: this.UFs = data;
      error: (err: string) => console.log('Erro ao carregar UFs: ', err);
    });
  }

  getMunicipios() {
    return this.BrasilapiService.getMunicipios(this.cliente.UF || '').subscribe(
      (data: Municipio[]) => {
        next: this.municipios = data;
        error: (err: string) =>
          console.log('Erro ao carregar Municípios: ', err);
      }
    );
  }

  ngOnInit() {
    this.getUFs();
    this.route.queryParamMap.subscribe((query: any) => {
      const params = query['params'];
      const id = params['id'];
      if (id) {
        let clienteEncontrado = this.service.buscarClientePorId(id);
        if (clienteEncontrado) {
          this.atualizando = true;
          this.cliente =
            this.service.buscarClientePorId(id) || Cliente.newCliente();
        }
        this.getMunicipios();
      }
    });
  }
}
