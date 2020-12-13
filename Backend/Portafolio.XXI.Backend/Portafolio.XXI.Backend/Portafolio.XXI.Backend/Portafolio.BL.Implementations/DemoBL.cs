using Portafolio.Aplication.DTO;
using Portafolio.BL.Contracts;
using Portafolio.Infraestructure.Data.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Infraestructure.Data.Implementation
{
    public class DemoBL : IDemo
    {
        IDemoDAO _demoDAO;
        public DemoBL(IDemoDAO demo)
        {
            this._demoDAO = demo;
        }

        public ResponseDTO flow(int numero)
        {
            return _demoDAO.flow(numero);
        }
    }
}