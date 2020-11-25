using Portafolio.Aplication.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Infraestructure.Data.Contracts
{
    public interface IInsumoDAO
    {
        ResponseDTO CrearInsumo(CrearInsumoDTO insumoDTO);
        ResponseDTO ModificarInsumo(CrearInsumoDTO insumoDTO);
        ResponseDTO EliminarInsumo(int insumoId);
        ListaInsumoOutDTO ListarInsumo(int categoriaInsumoId);
    }
}