using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Aplication.DTO
{
    public class PedidoListaDTO
    {
        public int pedidoId { get; set; }
        public int mesaId { get; set; }
        public int usuarioId { get; set; }
        public int estadoPedido { get; set; }
        public List<ComestibleDTO> listaComestible { get; set; }
        public List<BebestibleDTO> listaBebestible { get; set; }
    }
}