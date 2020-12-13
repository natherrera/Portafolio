using Portafolio.Aplication.DTO;
using Portafolio.BL.Contracts;
using Portafolio.Infraestructure.Data.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.BL.Implementations
{
    public class MesaBL : IMesa
    {
        IMesaDAO _mesaDAO;
        public MesaBL(IMesaDAO mesa)
        {
            this._mesaDAO = mesa;
        }

        public ResponseDTO CrearMesa(CrearMesaDTO mesaDTO)
        {
            return _mesaDAO.CrearMesa(mesaDTO);
        }

        public ResponseDTO ModificarMesa(CrearMesaDTO mesaDTO)
        {
            return _mesaDAO.ModificarMesa(mesaDTO);
        }

        public ResponseDTO EliminarMesa(int mesaId)
        {
            return _mesaDAO.EliminarMesa(mesaId);
        }

        public ListaMesaOutDTO ListarMesa(int estadoMesaId)
        {
            return _mesaDAO.ListarMesa(estadoMesaId);
        }
    }
}