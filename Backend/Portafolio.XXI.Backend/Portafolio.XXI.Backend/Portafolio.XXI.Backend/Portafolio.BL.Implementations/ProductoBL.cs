using Portafolio.Aplication.DTO;
using Portafolio.BL.Contracts;
using Portafolio.Infraestructure.Data.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.BL.Implementations
{
    public class ProductoBL : IProducto
    {
        IProductoDAO _productoDAO;
        IRecetaDAO _recetaDAO;
        public ProductoBL(IProductoDAO producto, IRecetaDAO receta)
        {
            this._productoDAO = producto;
            this._recetaDAO = receta;
        }
        public ResponseDTO CrearProducto(ProductoDTO productoDTO)
        {
            ResponseProductoDTO resp = new ResponseProductoDTO();
            resp = _productoDAO.CrearProducto(productoDTO);
            ResponseDTO response = new ResponseDTO();
            if(resp.code == 0 && resp.message.ToUpper() =="OK"){
                productoDTO.receta.productoId = resp.productoId;
                response = _recetaDAO.CrearReceta(productoDTO.receta);
            }
            return response;
        }

        public ResponseDTO EliminarProducto(int productoId)
        {
            return _productoDAO.EliminarProducto(productoId);
        }

        public ResponseDTO ModificarProducto(ProductoDTO productoDTO)
        {
            return _productoDAO.ModificarProducto(productoDTO);
        }

        public List<ProductoOutDTO> ListarProducto(int categoriaId)
        {
            return _productoDAO.ListarProducto(categoriaId);
        }
    }
}