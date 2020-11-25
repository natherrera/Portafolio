using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Aplication.DTO
{
    public class ListaInsumoOutDTO : ResponseDTO
    {
        public List<InsumoOutDTO> listaInsumos { get; set; }
    }
}