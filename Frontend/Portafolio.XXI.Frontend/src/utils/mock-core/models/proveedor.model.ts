import { TipoProveedor } from './tipoProveedor.model';

export interface Proveedor {
    id: Number;
    nombreProveedor: string;
    tipoProveedor: TipoProveedor;
}
