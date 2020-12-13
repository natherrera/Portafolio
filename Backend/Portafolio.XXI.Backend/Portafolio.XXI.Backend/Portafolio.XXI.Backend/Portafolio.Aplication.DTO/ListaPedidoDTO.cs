using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Aplication.DTO
{
    public class ListaPedidoDTO : ResponseDTO
    {
        public List<PedidoOutDTO> listaPedido { get; set; }
    }
}