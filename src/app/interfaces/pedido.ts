export interface Pedido {

    id: number;
    fechaPedido: Date;
    fechaRecepcion: Date;
    idProveedor: number, 
    importeTotal: number, 
    esBorrado: boolean
}
