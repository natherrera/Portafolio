using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Aplication.DTO
{
    public class InsumoOutDTO
    {
        public int insumoId { get; set; }
        public string nombre { get; set; }
        public string marca { get; set; }
        public string isActivo { get; set; }
        public string categoriaInsumo { get; set; }
        public int precio { get; set; }
        public string unidadMedida { get; set; }

    }
}