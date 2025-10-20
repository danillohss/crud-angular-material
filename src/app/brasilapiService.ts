import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Municipio, UF } from './brasilapi.models';

@Injectable({
  providedIn: 'root',
})
export class BrasilapiService {
  baseURL: string = 'https://brasilapi.com.br/api/';
  constructor(private http: HttpClient) {}
  getUFs(): Observable<UF[]> {
    return this.http.get<UF[]>(`${this.baseURL}ibge/uf/v1`);
  }
  getMunicipios(UF: string): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(
      `${this.baseURL}ibge/municipios/v1/${UF}?providers=dados-abertos-br,gov,wikipedia`
    );
  }
}
