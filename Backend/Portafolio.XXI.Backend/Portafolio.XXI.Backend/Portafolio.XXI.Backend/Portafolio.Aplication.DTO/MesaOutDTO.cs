using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Aplication.DTO
{
    public class MesaOutDTO
    {
        public int mesaId { get; set; }
        public string nombre { get; set; }
        public int cantidadPersonas { get; set; }
        public string estadoMesa { get; set; }
        public string ubicacionMesa { get; set; }
    }
}