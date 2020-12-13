using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Aplication.DTO
{
    public class ResponseProductoDTO
    {
        public int productoId { get; set; }
        public int code { get; set; }
        public string message { get; set; }
    }
}