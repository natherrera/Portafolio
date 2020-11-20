using Portafolio.Aplication.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Infraestructure.Data.Contracts
{
    public interface IRecetaDAO
    {
        ResponseDTO CrearReceta(IngresarRecetaDTO recetaDTO);
    }
}