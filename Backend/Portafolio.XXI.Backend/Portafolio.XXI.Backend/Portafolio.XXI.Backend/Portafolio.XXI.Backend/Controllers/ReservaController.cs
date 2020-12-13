using Portafolio.Aplication.DTO;
using Portafolio.BL.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Portafolio.XXI.Backend.Controllers
{
    public class ReservaController : Controller
    {
        IReserva _reserva;
        public ReservaController(IReserva reserva)
        {
            this._reserva = reserva;
        }

        [HttpPost]
        public JsonResult CreateReserve(CreateReserveDTO createReserveDTO)
        {
            ResponseDTO resp = new ResponseDTO();
            resp = _reserva.CreateReserve(createReserveDTO);
            return Json(resp, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [Route("CancelReserve/{id}")]
        public JsonResult CancelReserve(int id)
        {
            ResponseDTO resp = new ResponseDTO();
            resp = _reserva.CancelReserve(id);
            return Json(resp, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("ListarReserva")]
        public JsonResult ListarReserva(string correo)
        {
            List<ListarReservaDTO> resp = new List<ListarReservaDTO>();
            resp = _reserva.ListarReserva(correo);
            return Json(resp, JsonRequestBehavior.AllowGet);
        }
    }
}