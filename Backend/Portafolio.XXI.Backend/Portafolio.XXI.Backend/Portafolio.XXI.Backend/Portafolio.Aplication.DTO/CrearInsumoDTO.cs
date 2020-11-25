using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Aplication.DTO
{
    public class CrearInsumoDTO
    {
        public int idInsumo { get; set; }
        public string nombre { get; set; }
        public string marca { get; set; }
        public string isActivo { get; set; }
        public int categoriaInsumo { get; set; }
        public int precio { get; set; }
        public int unidadMedida { get; set; }
    }
}