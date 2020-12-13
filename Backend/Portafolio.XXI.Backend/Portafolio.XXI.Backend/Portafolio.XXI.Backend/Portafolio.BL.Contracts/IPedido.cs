using Portafolio.Aplication.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.BL.Contracts
{
    public interface IPedido
    {
        ResponseDTO CrearPedido(IngresarPedidoDTO pedidoDTO);
        ResponseDTO ModificarEstadoPedido(EstadoPedidoDTO estadoDTO);
        ListaFinalPedidoDTO ListarPedidos(int estadoId);
    }
}