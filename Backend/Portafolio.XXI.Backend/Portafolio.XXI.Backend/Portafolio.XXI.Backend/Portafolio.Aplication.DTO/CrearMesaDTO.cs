using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Aplication.DTO
{
    public class CrearMesaDTO
    {
        public int? idMesa { get; set; }
        public string nombre { get; set; }
        public int cantidadPersonas { get; set; }
        public int estadoMesa { get; set; }
        public int categoriaMesa { get; set; }
    }
}