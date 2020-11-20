using Portafolio.Aplication.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.BL.Contracts
{
    public interface IMesa
    {
        ResponseDTO CrearMesa(CrearMesaDTO mesaDTO);
        ResponseDTO ModificarMesa(CrearMesaDTO mesaDTO);
        ResponseDTO EliminarMesa(int mesaId);
        ListaMesaOutDTO ListarMesa(int estadoMesaId);
    }
}