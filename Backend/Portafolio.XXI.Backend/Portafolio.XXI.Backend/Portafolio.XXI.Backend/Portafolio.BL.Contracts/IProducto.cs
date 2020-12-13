using Portafolio.Aplication.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.BL.Contracts
{
    public interface IProducto
    {
        ResponseDTO CrearProducto(ProductoDTO productoDTO);
        ResponseDTO EliminarProducto(int productoId);
        ResponseDTO ModificarProducto(ProductoDTO productoDTO);
        List<ProductoOutDTO>  ListarProducto(int categoriaId);
    }
}