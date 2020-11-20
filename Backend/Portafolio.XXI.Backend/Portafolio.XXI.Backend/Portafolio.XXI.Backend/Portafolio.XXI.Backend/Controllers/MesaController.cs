using Portafolio.Aplication.DTO;
using Portafolio.BL.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Results;
using System.Web.Mvc;

namespace Portafolio.XXI.Backend.Controllers
{
    public class MesaController : Controller
    {
        IMesa _mesa;
        public MesaController(IMesa mesa)
        {
            this._mesa = mesa;
        }

        [HttpPost]
        public JsonResult CrearMesa(CrearMesaDTO mesaDTO)
        {
            ResponseDTO resp = new ResponseDTO();
            resp = _mesa.CrearMesa(mesaDTO);
            return Json(resp, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ModificarMesa(CrearMesaDTO mesaDTO)
        {
            ResponseDTO resp = new ResponseDTO();
            resp = _mesa.ModificarMesa(mesaDTO);
            return Json(resp, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [Route("EliminarMesa/{id}")]
        public JsonResult EliminarMesa(int id)
        {
            ResponseDTO resp = new ResponseDTO();
            resp = _mesa.EliminarMesa(id);
            return Json(resp, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("ListarMesa/{id}")]
        public JsonResult ListarMesa(int id)
        {
            ListaMesaOutDTO resp = new ListaMesaOutDTO();
            resp = _mesa.ListarMesa(id);
            return Json(resp, JsonRequestBehavior.AllowGet);
        }
    }
}