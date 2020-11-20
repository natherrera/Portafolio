using Portafolio.Aplication.DTO;
using Portafolio.BL.Contracts;
using Portafolio.Infraestructure.Data.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.BL.Implementations
{
    public class ReservaBL : IReserva
    {
        IReserveDAO _reserva;
        public ReservaBL(IReserveDAO reserva)
        {
            this._reserva = reserva;
        }
        public ResponseDTO CreateReserve(CreateReserveDTO createReserveDTO)
        {
            return _reserva.CreateReserve(createReserveDTO);
        }

        public ResponseDTO CancelReserve(int idReserve)
        {
            return _reserva.CancelReserve(idReserve);
        }

        public List<ListarReservaDTO> ListarReserva(string usuarioEmail)
        {
            return _reserva.ListarReserva(usuarioEmail);
        }
    }
}