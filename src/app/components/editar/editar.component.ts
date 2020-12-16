import { Component, OnInit } from '@angular/core';
import { FacturaService } from './../../services/factura.service';
import { Producto } from './../../Models/Producto';
import { Factura } from './../../Models/Factura';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  editFactura: any = { }
  id_fact: any

  //factForm: FormGroup
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
    /*this.factForm = this._builder.group({
      nombreCliente: ['', Validators.required],
      rnc: ['', Validators.required],
      descripcion: ['', Validators.required]
    })*/

    this.prodForm = this._builder.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this._ac.paramMap.subscribe(params => {
      this.id_fact = params.get('id')
    })
    this.getFacturaById(this.id_fact)
  }

  onSubmit() {
    if (this.productList.length !== 0) {   
      this.factura = {
        nombreCliente: this.editFactura.nombreCliente,
        rnc: this.editFactura.rnc,
        descripcion: this.editFactura.descripcion,
        detalle: JSON.stringify(this.productList),
        subtotal: this.subTotal,
        itbis: this.itbis,
        total: this.total
      }
      console.log(this.factura)
      this.facturaService.updateFactura(this.id_fact, this.factura).subscribe(
        res => {
          if (res.ok) {
            this.productList = []
            Swal.fire(
              'Factura editada!',
              'Se ha editado la factura correctamente',
              'success'
            )
            this.router.navigate(['/adminfacturas'])
          }
          else {
            console.log(res)
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

  getFacturaById(id) {
    this.facturaService.getFacturaById(id).subscribe(
      res => {
        this.editFactura = res.factura

        this.productList = JSON.parse(res.factura.detalle)
        this.subTotal = 0
        this.productList.forEach(e => {
          this.subTotal += e.precioTotal
        })
        this.itbis = this.subTotal * 0.18
        this.total = this.subTotal + this.itbis
        this.itbis = Number(this.itbis.toFixed(2))
        this.total.toFixed(2)



        console.log(this.editFactura)
      },
      err => console.log(err)
    )
  }
}
