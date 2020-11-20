using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Aplication.DTO
{
    public class ComestibleDTO
    {
        public int categoriaProductoId { get; set; }
        public string categoriaNombre { get; set; }
        public int idProducto { get; set; }
        public string nombreProducto { get; set; }
        public int cantidadProducto { get; set; }
        public int precioProducto { get; set; }
        public string observacion { get; set; }
    }
}