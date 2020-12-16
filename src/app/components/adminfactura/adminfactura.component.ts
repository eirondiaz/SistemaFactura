import { FacturaService } from './../../services/factura.service';
import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/Models/Factura';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-adminfactura',
  templateUrl: './adminfactura.component.html',
  styleUrls: ['./adminfactura.component.css']
})
export class AdminfacturaComponent implements OnInit {

  facturaList: Factura[] = []
  prueba: any = { }

  busqueda = new FormControl('')

  busquedaList: Factura[] = []

  leg: number = 0

  constructor(private facturaService: FacturaService) { }

  ngOnInit(): void {
    this.getFacturas()
    this.busqueda.valueChanges.subscribe(
      value => {
        this.buscar(value)
        this.leg = value.length
      }
    )
  }

  getFacturas() {
    this.facturaService.getFacturas().subscribe(
      res => this.facturaList = res.facturas,
      err => console.log(err)
    )
  }

  deleteFactura(id) {
    Swal.fire({
      title: 'Estas seguro que deseas eliminar esta factura?',
      text: "No podás revertir los cambios",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then(result => {
      if (result.isConfirmed) {
        this.facturaService.deleteFactura(id).subscribe(
          res => {
            if (res.ok) {
              this.getFacturas()     
              Swal.fire(
                'Eliminado!',
                'La factura ha sido eliminada.',
                'success'
              )
            }
          },
          err => console.log(err)
        )
      }
    })
  }

  buscar(value) {
    if (value.length === 0) {
      this.getFacturas()
    }
    else {
      this.busquedaList = this.facturaList.filter(x => x.nombreCliente.toUpperCase().includes(value.toUpperCase()))
    }
  }
}
