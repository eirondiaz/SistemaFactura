import { Producto } from './../../Models/Producto';
import { Factura } from 'src/app/Models/Factura';
import { FacturaService } from './../../services/factura.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  factura: Factura = {}
  productList: Producto[] = []

  id_fact: any

  constructor(
    private facturaService: FacturaService,
    private _ac: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._ac.paramMap.subscribe(params => {
      this.id_fact = params.get('id')
    })
    this.getFacturaById(this.id_fact)
  }

  onExportClick() {
    const options = {
      filename: 'mi_factura.pdf',
      image: {type: 'jpeg'},
      html2canvas: {},
      jsPDF: {orientation: 'portrait'}
    };

    const content: Element = document.getElementById('conte')

    html2pdf()
      .from(content)
      .set(options)
      .save()
  }

  getFacturaById(id) {
    this.facturaService.getFacturaById(id).subscribe(
      res => {
        this.factura = res.factura
        this.productList = JSON.parse(res.factura.detalle)
      }
    )
  }
}
