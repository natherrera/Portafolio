using Portafolio.Aplication.DTO;
using Portafolio.BL.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Portafolio.XXI.Backend.Controllers
{
    public class TrabajadorController : Controller
    {
        ITrabajador _trbajador;
        public TrabajadorController(ITrabajador trabajador)
        {
            this._trbajador = trabajador;
        }

        [HttpPost]
        public JsonResult InsertarTrabajador(InsertarTrabajadorInDTO trabajadorDTO)
        {
            InsertarTrabajadorOutDTO resp = new InsertarTrabajadorOutDTO();
            resp = _trbajador.InsertarTrabajador(trabajadorDTO);
            return Json(resp, JsonRequestBehavior.AllowGet);
        }
        
    }
}
