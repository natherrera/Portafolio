using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Aplication.DTO
{
    public class CreateReserveDTO
    {
        public int cantPerson { get; set; }
        public string reserveDate { get; set; }
        public string isTotem { get; set; }
        public string usuarioEmail { get; set; }
        public int usuarioFono { get; set; }
    }
}