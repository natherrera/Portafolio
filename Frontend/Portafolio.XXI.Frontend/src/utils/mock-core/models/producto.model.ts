import {Insumo} from './insumo.model';

export interface Producto {
    id: string;
    nombreProducto: string;
    descripcion: string;
    tipoProducto: string;
    imagen: string;
    receta: Array<DetalleInsumo>;
}

export interface DetalleInsumo {
    insumo: Insumo;
    cantidad: number;
}
