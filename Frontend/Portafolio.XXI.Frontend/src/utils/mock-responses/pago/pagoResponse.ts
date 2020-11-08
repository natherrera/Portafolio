import { Pago } from "../../mock-core/models/pago.model";

export const PAGO_DATA: Pago[] = [
    {id: '1', mesa: '1', tipoPago: "Efectivo" , idCliente: "726354", fecha:"10/10/2020", hora: '09:00',total: 20000, estado: "Solicita Cuenta" },
    {id: '2', mesa: '2', tipoPago: "Efectivo" , idCliente: "726353", fecha:"10/10/2020", hora: '09:00', total: 15000, estado: "En espera" },
    {id: '3', mesa: '3', tipoPago: "Efectivo" , idCliente: "726354", fecha:"10/10/2020", hora: '09:00', total: 10000, estado: "En espera" },
    {id: '4', mesa: '4', tipoPago: "Tarjeta" , idCliente: "726354", fecha:"10/10/2020", hora: '09:00', total: 11000, estado: "En espera" },
    {id: '5', mesa: '5', tipoPago: "Efectivo" , idCliente: "726354", fecha:"10/10/2020", hora: '09:00', total: 16500, estado: "En espera" },
    {id: '6', mesa: '6', tipoPago: "Efectivo" , idCliente: "726354", fecha:"10/10/2020", hora: '09:00', total: 15000, estado: "Pagada" },
    {id: '7', mesa: '7', tipoPago: "Efectivo" , idCliente: "726354", fecha:"10/10/2020", hora: '09:00', total: 11000, estado: "Solicita Cuenta" },
    {id: '8', mesa: '8', tipoPago: "Tarjeta" , idCliente: "726354", fecha:"10/10/2020", hora: '09:00', total: 10500, estado: "En espera" },
    {id: '9', mesa: '9', tipoPago: "Efectivo" , idCliente: "726354", fecha:"10/10/2020", hora: '09:00', total: 15000, estado: "En espera" },
    {id: '10', mesa: '10', tipoPago: "Efectivo" , idCliente: "726354", fecha:"10/10/2020", hora: '09:00', total: 18000, estado: "En espera" },
];
