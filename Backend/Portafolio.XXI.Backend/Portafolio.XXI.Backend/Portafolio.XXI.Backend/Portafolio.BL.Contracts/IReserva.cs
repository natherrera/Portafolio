using Portafolio.Aplication.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.BL.Contracts
{
    public interface IReserva
    {
        ResponseDTO CreateReserve(CreateReserveDTO createReserveDTO);
        ResponseDTO CancelReserve(int idReserve);
        List<ListarReservaDTO> ListarReserva(string usuarioEmail);
    }
}