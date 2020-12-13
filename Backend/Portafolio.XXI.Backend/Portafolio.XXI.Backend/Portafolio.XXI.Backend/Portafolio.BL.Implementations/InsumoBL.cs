using Portafolio.Aplication.DTO;
using Portafolio.BL.Contracts;
using Portafolio.Infraestructure.Data.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.BL.Implementations
{
    public class InsumoBL : IInsumo
    {
        IInsumoDAO _insumoDAO;
        public InsumoBL(IInsumoDAO insumo)
        {
            this._insumoDAO = insumo;
        }

        public ResponseDTO CrearInsumo(CrearInsumoDTO insumoDTO)
        {
            return _insumoDAO.CrearInsumo(insumoDTO);
        }

        public ResponseDTO ModificarInsumo(CrearInsumoDTO insumoDTO)
        {
            return _insumoDAO.ModificarInsumo(insumoDTO);
        }

        public ResponseDTO EliminarInsumo(int insumoId)
        {
            return _insumoDAO.EliminarInsumo(insumoId);
        }

        public ListaInsumoOutDTO ListarInsumo(int estadoInsumoId)
        {
            return _insumoDAO.ListarInsumo(estadoInsumoId);
        }
    }
}