using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Aplication.DTO
{
    public class IngresarPedidoDTO
    {
        public int mesaId { get; set; }
        public int? usuarioId { get; set; }
        public string tipoAtencion { get; set; }
        public List<ProductoPedidoDTO> listaProducto { get; set; }
        
    }
}