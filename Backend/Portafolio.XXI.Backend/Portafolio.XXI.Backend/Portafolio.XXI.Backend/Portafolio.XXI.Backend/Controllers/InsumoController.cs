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
    public class InsumoController : Controller
    {
        IInsumo _insumo;
        public InsumoController(IInsumo insumo)
        {
            this._insumo = insumo;
        }

        [HttpPost]
        public JsonResult CrearInsumo(CrearInsumoDTO insumoDTO)
        {
            ResponseDTO resp = new ResponseDTO();
            resp = _insumo.CrearInsumo(insumoDTO);
            return Json(resp, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ModificarInsumo(CrearInsumoDTO insumoDTO)
        {
            ResponseDTO resp = new ResponseDTO();
            resp = _insumo.ModificarInsumo(insumoDTO);
            return Json(resp, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [Route("EliminarInsumo/{id}")]
        public JsonResult EliminarInsumo(int id)
        {
            ResponseDTO resp = new ResponseDTO();
            resp = _insumo.EliminarInsumo(id);
            return Json(resp, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("ListarInsumo/{id}")]
        public JsonResult ListarInsumo(int id)
        {
            ListaInsumoOutDTO resp = new ListaInsumoOutDTO();
            resp = _insumo.ListarInsumo(id);
            return Json(resp, JsonRequestBehavior.AllowGet);
        }
    }
}