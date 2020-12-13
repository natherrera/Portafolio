using Portafolio.Aplication.DTO;
using Portafolio.BL.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Portafolio.XXI.Backend.Controllers
{
    public class RecetaController : Controller
    {
        IReceta _receta;
        public RecetaController(IReceta receta)
        {
            this._receta = receta;
        }

        [HttpPost]
        public JsonResult CrearReceta(IngresarRecetaDTO recetaDTO)
        {
            ResponseDTO resp = new ResponseDTO();
            resp = _receta.CrearReceta(recetaDTO);
            return Json(resp, JsonRequestBehavior.AllowGet);
        }
    }
}