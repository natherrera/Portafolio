import { Receta } from './producto.model';

export interface Pedido {
    id: string;
    mesa: string;
    tipoEntrega: string
    idCliente: string;
    fecha: string;
    hora: string;
    estadoPreparacion: string;
    comestibles: Array<DetalleProducto>;
    bebestibles: Array<DetalleProducto>;
    subtotal: number;
    total: number;
}

export interface DetalleProducto {
    idProducto: number;
    nombreProducto: string;
    cantidad: number;
    total: number;
}

export class PedidoCabecera{
    mesa: string;
    pedido: Pedido2[];
    total: number;
    tipoAtencion: string;
}

export interface Pedido2{
    cantidad: number;
    descripcion: string;
    id: number;
    imagen: string;
    nombreProducto: string;
    receta: RecetaPedido;
    tipoProducto: string;
    total: number;
    valor: number;
}

export interface RecetaPedido{
    id: string;
    instrucciones: string;
    listaInsumos: InsumosPedido[];
}

export interface InsumosPedido{
    cantidad: number;
    instrucciones: string;
    insumoId: number;
    insumoNombre: string;
    unidadMedida: string;
}

