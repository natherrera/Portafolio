using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Aplication.DTO
{
    public class ListaMesaOutDTO : ResponseDTO
    {
        public List<MesaOutDTO> listaMesas { get; set; }
    }
}