using Portafolio.Aplication.DTO;
using Portafolio.BL.Contracts;
using Portafolio.Infraestructure.Data.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portafolio.BL.Implementations
{
    public class TrabajadorBL : ITrabajador
    {
        ITrabajadorDAO _trabajadorDAO;
        public TrabajadorBL(ITrabajadorDAO trabajador)
        {
            this._trabajadorDAO = trabajador;
        }

        public InsertarTrabajadorOutDTO InsertarTrabajador(InsertarTrabajadorInDTO trabajadorDTO)
        {
            return _trabajadorDAO.InsertarTrabajador(trabajadorDTO);
        }
    }
}
