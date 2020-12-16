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
    idReceta: string;
    nombre: string;
    instrucciones: string;
    listaInsumos: Array<DetalleInsumo>;
}

export interface DetalleInsumo {
    insumo: Insumo;
    cantidad: number;
    unidadMedida: string;
}


