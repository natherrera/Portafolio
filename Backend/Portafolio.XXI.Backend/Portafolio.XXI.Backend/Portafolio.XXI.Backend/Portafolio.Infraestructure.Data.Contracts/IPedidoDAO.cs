using Portafolio.Aplication.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Infraestructure.Data.Contracts
{
    public interface IPedidoDAO
    {
        ResponseDTO CrearPedido(IngresarPedidoDTO pedidoDTO);
        ResponseDTO ModificarEstadoPedido(EstadoPedidoDTO estadoDTO);
        ListaPedidoDTO ListarPedidos(int estadoId);
    }
}