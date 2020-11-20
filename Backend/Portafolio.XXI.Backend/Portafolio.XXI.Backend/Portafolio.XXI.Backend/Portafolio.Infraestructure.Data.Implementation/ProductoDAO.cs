using Portafolio.Aplication.DTO;
using Portafolio.Infraestructure.Data.Contracts;
using Portafolio.Infraestructure.Data.Helper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;

namespace Portafolio.Infraestructure.Data.Implementation
{
    public class ProductoDAO : IProductoDAO
    {
        string conectionString = ConfigurationManager.ConnectionStrings["BBDD"].ConnectionString;
        private readonly IResultHelper _IResultlSetHelper;
        public ProductoDAO(IResultHelper IResultlSetHelper)
        {
            _IResultlSetHelper = IResultlSetHelper;
        }
        public ResponseProductoDTO CrearProducto(ProductoDTO productoDTO)
        {
            ResponseProductoDTO response = new ResponseProductoDTO();
            _IResultlSetHelper.setDataSource(conectionString);

            string packageName = "pkg_iteracion_2";
            string procedureName = "INSERTAR_PRODUCTO";
            List<string> inParam = new List<string>();
            List<string> outParam = new List<string>();
            List<string> result = new List<string>();

            inParam.Add(productoDTO.nombre);
            inParam.Add(productoDTO.precio.ToString());
            inParam.Add(productoDTO.descripcion);
            inParam.Add(productoDTO.categoriaId.ToString());

            outParam.Add("o_result");
            outParam.Add("o_id");

            result = _IResultlSetHelper.executePackage(packageName, procedureName, inParam, outParam);

            if (result[0].ToString().Equals("OK"))
            {
                response.code = 0;
                response.message = "OK";
                response.productoId = int.Parse(result[1].ToString());
            }
            else
            {
                response.code = 999;
                response.message = String.Concat("NoOk - ", result[0].ToString());
            }

            return response;
        }

        public ResponseDTO EliminarProducto(int productoId)
        {
            ResponseDTO response = new ResponseDTO();
            _IResultlSetHelper.setDataSource(conectionString);

            string packageName = "pkg_iteracion_2";
            string procedureName = "ELIMINAR_PRODUCTO";
            List<string> inParam = new List<string>();
            List<string> outParam = new List<string>();
            List<string> result = new List<string>();

            inParam.Add(productoId.ToString());

            outParam.Add("o_result");

            result = _IResultlSetHelper.executePackage(packageName, procedureName, inParam, outParam);

            if (result[0].ToString().Equals("OK"))
            {
                response.code = 0;
                response.message = "OK";
            }
            else
            {
                response.code = 999;
                response.message = String.Concat("NoOk - ", result[0].ToString());
            }

            return response;
        }

        public ResponseDTO ModificarProducto(ProductoDTO productoDTO)
        {
            ResponseDTO response = new ResponseDTO();
            _IResultlSetHelper.setDataSource(conectionString);

            string packageName = "pkg_iteracion_2";
            string procedureName = "MODIFICAR_PRODUCTO";
            List<string> inParam = new List<string>();
            List<string> outParam = new List<string>();
            List<string> result = new List<string>();

            inParam.Add(productoDTO.productoId.ToString());
            inParam.Add(productoDTO.nombre);
            inParam.Add(productoDTO.precio.ToString());
            inParam.Add(productoDTO.descripcion);
            inParam.Add(productoDTO.categoriaId.ToString());

            outParam.Add("o_result");

            result = _IResultlSetHelper.executePackage(packageName, procedureName, inParam, outParam);

            if (result[0].ToString().Equals("OK"))
            {
                response.code = 0;
                response.message = "OK";
            }
            else
            {
                response.code = 999;
                response.message = String.Concat("NoOk - ", result[0].ToString());
            }

            return response;
        }

        public List<ProductoOutDTO> ListarProducto(int categoriaId)
        {
            ProductoOutDTO producto = new ProductoOutDTO();
            List<ProductoOutDTO> response = new List<ProductoOutDTO>();
            _IResultlSetHelper.setDataSource(conectionString);

            string packageName = "pkg_iteracion_2";
            string procedureName = "LISTAR_PRODUCTO";
            List<string> inParam = new List<string>();
            List<string> outParam = new List<string>();
            List<string> result = new List<string>();

            inParam.Add(categoriaId.ToString());
            outParam.Add("o_cursor");
            outParam.Add("o_result");

            var oReader = _IResultlSetHelper.executePackage(packageName, procedureName, inParam, outParam, "o_cursor");

            if (oReader.Rows.Count > 0)
            {
                foreach (DataRow row in oReader.Rows)
                {
                    producto .productoId = int.Parse(row[0].ToString());
                    producto.nombre = row[1].ToString();
                    producto.precio = int.Parse(row[2].ToString());
                    producto.descripcion = row[3].ToString();
                    producto.tipoProducto = row[4].ToString();

                    response.Add(producto);

                }
            }
            else
            {
                producto.code = 999;
                producto.message = String.Concat("NoOk - ", result[2].ToString());
            }

            return response;
        }
    }
}