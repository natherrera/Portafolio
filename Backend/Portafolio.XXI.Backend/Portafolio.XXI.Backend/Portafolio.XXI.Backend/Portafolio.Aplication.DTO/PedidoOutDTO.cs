using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Aplication.DTO
{
    public class PedidoOutDTO
    {
        public int pedidoId { get; set; }
        public int mesaId { get; set; }
        public int usuarioId { get; set; }
        public string fechaPedido { get; set; }
        public string horaPedido { get; set; }
        public int estadoPedido { get; set; }
        public int categoriaProductoId { get; set; }
        public string categoriaNombre { get; set; }
        public int productoId { get; set; }
        public string nombreProducto { get; set; }
        public int cantidadProducto { get; set; }
        public int precioProducto { get; set; }
        public string observacionPedido { get; set; }
    }
}