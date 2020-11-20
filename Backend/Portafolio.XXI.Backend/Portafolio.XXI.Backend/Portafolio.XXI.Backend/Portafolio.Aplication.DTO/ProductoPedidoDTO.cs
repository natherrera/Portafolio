using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Aplication.DTO
{
    public class ProductoPedidoDTO
    {
        public int productoId { get; set; }
        public int cantidadProducto { get; set; }
        public string observacion { get; set; }
    }
}