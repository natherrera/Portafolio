using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portafolio.Aplication.DTO
{
    public class InsertarTrabajadorInDTO
    {
        public int rut { get; set; }
        public string nombre { get; set; }
        public string apellidoPat { get; set; }
        public string apellidoMat { get; set; }
        public string fechaNacimiento { get; set; }
        public int sexoId { get; set; }
        public int perfilId { get; set; }
    }
}
