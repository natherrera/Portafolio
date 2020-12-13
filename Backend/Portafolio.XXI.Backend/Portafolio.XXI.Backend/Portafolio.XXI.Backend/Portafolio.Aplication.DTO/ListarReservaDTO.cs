using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portafolio.Aplication.DTO
{
    public class ListarReservaDTO
    {
        public int reservaId { get; set; }
        public int numeroFolio { get; set; }
        public string estadoReserva { get; set; }
        public int cantidadPersonas { get; set; }
        public string fechaReserva { get; set; }
        public string fechaRegistro { get; set; }
        public string usuarioEmail { get; set; }
        public int usuarioFono { get; set; }
    }
}
