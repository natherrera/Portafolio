using Portafolio.Aplication.DTO;
using Portafolio.BL.Contracts;
using Portafolio.Infraestructure.Data.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.BL.Implementations
{
    public class RecetaBL : IReceta
    {
        IRecetaDAO _recetaDAO;
        public RecetaBL(IRecetaDAO receta)
        {
            this._recetaDAO = receta;
        }

        public ResponseDTO CrearReceta(IngresarRecetaDTO recetaDTO)
        {
            return _recetaDAO.CrearReceta(recetaDTO);
        }
    }
}