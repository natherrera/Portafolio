import { TipoProveedor } from './tipoProveedor.model';

export interface Proveedor {
    id: string;
    nombreProveedor: string;
    tipoProveedor: TipoProveedor;
}
