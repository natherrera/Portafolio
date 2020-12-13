using Portafolio.Aplication.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portafolio.BL.Contracts
{
    public interface ITrabajador
    {
        InsertarTrabajadorOutDTO InsertarTrabajador(InsertarTrabajadorInDTO trabajadorDTO);
    }
}
