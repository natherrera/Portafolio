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
    idProducto: string;
    cantidad: number;
}

