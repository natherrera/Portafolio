using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Aplication.DTO
{
    public class InsumoRecetaDTO
    {
        public int insumoId { get; set; }
        public int cantidad { get; set; }
        public int unidadMedidaId { get; set; }
    }
}