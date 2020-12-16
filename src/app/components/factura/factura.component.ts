import { FacturaService } from './../../services/factura.service';
import { Factura } from './../../Models/Factura';
import { Producto } from './../../Models/Producto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  today = new Date()
  currentDate = `${this.today.getDate()}/${this.today.getMonth() + 1}/${this.today.getFullYear()}`

  editFactura: Factura = { }
  id_fact: any

  factForm: FormGroup
  prodForm: FormGroup

  showModal: boolean = false

  productList: Producto[] = []

  prod: Producto
  subTotal: number = 0
  itbis: number = 0
  total: number = 0

  factura: Factura = { }

  constructor(
    private _builder: FormBuilder,
    private router: Router,
    private facturaService: FacturaService,
    private _ac: ActivatedRoute
  ) {
    this.factForm = this._builder.group({
      nombreCliente: [this.id_fact != null? '': this.editFactura.nombreCliente, Validators.required],
      rnc: [this.id_fact != null? '': this.editFactura.rnc, Validators.required],
      descripcion: [this.id_fact != null? '': this.editFactura.descripcion, Validators.required]
    })

    this.prodForm = this._builder.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required]
    })
  }

  ngOnInit(): void { 
  }

  onSubmit(values) {
    if (this.productList.length !== 0) {   
      this.factura = {
        nombreCliente: values.nombreCliente,
        rnc: values.rnc,
        descripcion: values.descripcion,
        fecha: this.currentDate,
        detalle: JSON.stringify(this.productList),
        subtotal: this.subTotal,
        itbis: this.itbis,
        total: this.total
      }
      console.log(this.factura)
      this.facturaService.createFactura(this.factura).subscribe(
        res => {
          if (res.ok) {        
            this.productList = []
            Swal.fire(
              'Factura creada!',
              'Se ha creado la factura correctamente',
              'success'
            )
            this.factForm.reset()
          }
        },
        err => console.log(err)
      )
    }
    else {
      Swal.fire(
        'Error!',
        'Debes agregar por lo menos un producto',
        'error'
      )
    }
  }

  crearProd(values) {
    //console.log(values)
    this.prodForm.reset()
    this.showModal = false

    this.prod = new Producto(this.productList.length + 1, values.nombre, values.precio, values.cantidad)

    this.productList.push(this.prod)

    this.subTotal = 0
    this.productList.forEach(e => {
      this.subTotal += e.precioTotal
    })
    this.itbis = this.subTotal * 0.18
    this.total = this.subTotal + this.itbis
    this.itbis = Number(this.itbis.toFixed(2))
    this.total.toFixed(2)
  }

  delProd(codigo) {
    this.productList = this.productList.filter(x => x.codigo !== codigo)

    this.subTotal = 0
    this.productList.forEach(e => {
      this.subTotal += e.precioTotal
    })
    this.itbis = this.subTotal * 0.18
    this.total = this.subTotal + this.itbis
  }
}
