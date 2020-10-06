using Portafolio.Aplication.DTO;
using Portafolio.BL.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Portafolio.XXI.Backend.Controllers
{
    public class DemoController : Controller
    {
        IDemo _demo;
        public DemoController(IDemo demo)
        {
            this._demo = demo;
        }
        public JsonResult  flow(int numero)
        {
            ResponseDTO resp = new ResponseDTO();
            resp = _demo.flow(numero);
            return Json(resp, JsonRequestBehavior.AllowGet);
        }
    }
}