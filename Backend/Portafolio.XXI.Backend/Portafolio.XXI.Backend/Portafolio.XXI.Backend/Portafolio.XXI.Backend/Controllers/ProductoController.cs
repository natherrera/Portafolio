using Portafolio.Aplication.DTO;
using Portafolio.BL.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Portafolio.XXI.Backend.Controllers
{
    public class ProductoController : Controller
    {
        IProducto _producto;
        public ProductoController(IProducto producto)
        {
            this._producto = producto;
        }
        [HttpPost]
        public JsonResult CrearProducto(ProductoDTO productoDTO)
        {
            ResponseDTO resp = new ResponseDTO();
            resp = _producto.CrearProducto(productoDTO);
            return Json(resp, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [Route("EliminarProducto/{id}")]
        public JsonResult EliminarProducto(int id)
        {
            ResponseDTO resp = new ResponseDTO();
            resp = _producto.EliminarProducto(id);
            return Json(resp, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ModificarProducto(ProductoDTO productoDTO)
        {
            ResponseDTO resp = new ResponseDTO();
            resp = _producto.ModificarProducto(productoDTO);
            return Json(resp, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("ListarProducto/{id}")]
        public JsonResult ListarProducto(int id)
        {
            List<ProductoOutDTO> resp = new List<ProductoOutDTO>();
            resp = _producto.ListarProducto(id);
            return Json(resp, JsonRequestBehavior.AllowGet);
        }

    }
}