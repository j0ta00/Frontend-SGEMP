export interface Pedido {
     id: Number;
     fechaPedido: Date;
     fechaRecepcion: Date;
     idProveedor: Number;
     importeTotal: Number;
     esBorrado: Boolean;
     nombreProveedor: String
}
