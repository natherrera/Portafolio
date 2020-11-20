
using Portafolio.Aplication.DTO;
using Portafolio.BL.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Portafolio.XXI.Backend.Controllers
{
    public class AutentificationController : Controller
    {
        IAutentication _autentication;
        public AutentificationController(IAutentication autentication)
        {
            this._autentication = autentication;
        }
        public JsonResult createUser (CreateUserDTO createUserDTO)
        {
            ResponseDTO resp = new ResponseDTO();
            resp = _autentication.createUser(createUserDTO);
            return Json(resp, JsonRequestBehavior.AllowGet);
        }
        public JsonResult userAutentification(UserAutentificationDTO userAutentificationDTO)
        {
            ProfileDTO resp = new ProfileDTO();
            resp = _autentication.userAutentification(userAutentificationDTO);
            return Json(resp, JsonRequestBehavior.AllowGet);
        }
    }
}