import {Insumo} from './insumo.model';

export interface Producto {
    id: number;
    nombreProducto: string;
    descripcion: string;
    tipoProducto: string;
    imagen: string;
    idReceta: number;
}

export interface Receta {
    idProducto: String;
    listaInsumos: Array<DetalleInsumo>;
}
export interface DetalleInsumo {
    insumo: Insumo;
    cantidad: number;
}

export class Producto2 {
    id: number;
    nombreProducto: string;
    descripcion: string;
    valor: number;
    costo: number;
    tipoProducto: string;
    imagen: string;
    receta = new Receta2();
}

export class Receta2{
    recetaid: number;
    instrucciones: string;
    listaInsumos: Insumos2[] = [];
}

export class Insumos2{
    insumoId: number;
    insumoNombre: string;
    unidadMedida: string;
    cantidad: number;
}