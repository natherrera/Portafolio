using Portafolio.Aplication.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portafolio.Infraestructure.Data.Contracts
{
    public interface ITrabajadorDAO
    {
        InsertarTrabajadorOutDTO InsertarTrabajador(InsertarTrabajadorInDTO trabajadorDTO);
    }
}
