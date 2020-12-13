using Portafolio.Aplication.DTO;
using Portafolio.BL.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Portafolio.XXI.Backend.Controllers
{
    public class PedidoController : Controller
    {
        IPedido _pedido;
        public PedidoController(IPedido pedido)
        {
            this._pedido = pedido;
        }

        [HttpPost]
        public JsonResult CrearPedido(IngresarPedidoDTO pedidoDTO)
        {
            ResponseDTO resp = new ResponseDTO();
            resp = _pedido.CrearPedido(pedidoDTO);
            return Json(resp, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ModificarEstadoPedido(EstadoPedidoDTO estadoDTO)
        {
            ResponseDTO resp = new ResponseDTO();
            resp = _pedido.ModificarEstadoPedido(estadoDTO);
            return Json(resp, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("ListarPedidos/{id}")]
        public JsonResult ListarPedidos(int id)
        {
            ListaFinalPedidoDTO resp = new ListaFinalPedidoDTO();
            resp = _pedido.ListarPedidos(id);
            return Json(resp, JsonRequestBehavior.AllowGet);
        }
    }
}