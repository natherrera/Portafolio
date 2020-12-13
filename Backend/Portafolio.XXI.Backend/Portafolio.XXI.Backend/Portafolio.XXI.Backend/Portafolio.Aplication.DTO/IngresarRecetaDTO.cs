using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Aplication.DTO
{
    public class IngresarRecetaDTO
    {
        public int? productoId { get; set; }
        public List<InsumoRecetaDTO> listaInsumo { get; set; }
    }
}