using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portafolio.Aplication.DTO
{
    public class InsertarTrabajadorOutDTO : ResponseDTO
    {
        public string correoUsuario { get; set; }
        public string password { get; set; }
    }
}
