using Portafolio.Aplication.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.BL.Contracts
{
    public interface IReceta
    {
        ResponseDTO CrearReceta(IngresarRecetaDTO recetaDTO);
    }
}