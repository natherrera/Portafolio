using Portafolio.Aplication.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Infraestructure.Data.Contracts
{
    public interface IReserveDAO
    {
        ResponseDTO CreateReserve(CreateReserveDTO createReserveDTO);
        ResponseDTO CancelReserve(int idReserve);
        List<ListarReservaDTO> ListarReserva(string usuarioEmail);
    }
}