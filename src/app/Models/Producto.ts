export class Producto {
    codigo?: number
    nombre?: string
    precio?: number
    cantidad?: number
    precioTotal?: number

    constructor(codigo: number, nombre: string, precio: number, cantidad: number) {
        this.codigo = codigo
        this.nombre = nombre
        this.precio = precio
        this.cantidad = cantidad
        this.precioTotal = precio * cantidad
    }
}