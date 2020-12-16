import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  URL: string = 'https://uuahng.deta.dev/factura'

  constructor(private http: HttpClient) { }

  getFacturas() {
    return this.http.get<any>(this.URL)
  }

  getFacturaById(id) {
    return this.http.get<any>(this.URL + '/' + id)
  }

  createFactura(fact) {
    return this.http.post<any>(this.URL, fact)
  }

  deleteFactura(id) {
    return this.http.delete<any>(this.URL + '/' + id)
  }

  updateFactura(id, factura: any) {
    return this.http.put<any>(this.URL + '/' + id, factura)
  }
}
