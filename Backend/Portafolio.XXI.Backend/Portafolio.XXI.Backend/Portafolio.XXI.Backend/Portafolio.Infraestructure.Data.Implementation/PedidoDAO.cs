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
    public class PedidoDAO : IPedidoDAO
    {
        string conectionString = ConfigurationManager.ConnectionStrings["BBDD"].ConnectionString;
        private readonly IResultHelper _IResultlSetHelper;
        public PedidoDAO(IResultHelper IResultlSetHelper)
        {
            _IResultlSetHelper = IResultlSetHelper;
        }

        public ResponseDTO CrearPedido(IngresarPedidoDTO pedidoDTO)
        {
            ResponseDTO response = new ResponseDTO();
            _IResultlSetHelper.setDataSource(conectionString);

            string packageName = "pkg_iteracion_2";
            string procedureName = "INSERTAR_PEDIDO";
            List<string> inParam = new List<string>();
            List<string> outParam = new List<string>();
            List<string> result = new List<string>();

            int id = 0;

            foreach (var producto in pedidoDTO.listaProducto)
            {
                inParam = new List<string>();
                outParam = new List<string>();
                result = new List<string>();

                inParam.Add(id.ToString());
                inParam.Add(pedidoDTO.usuarioId.ToString());
                inParam.Add(producto.productoId.ToString());
                inParam.Add(producto.cantidadProducto.ToString());
                inParam.Add(pedidoDTO.mesaId.ToString());
                inParam.Add(producto.observacion);

                outParam.Add("o_result");
                outParam.Add("o_id");

                result = _IResultlSetHelper.executePackage(packageName, procedureName, inParam, outParam);

                if (result[0].ToString().Equals("OK"))
                {
                    response.code = 0;
                    response.message = "OK";
                    id = Int32.Parse(result[1].ToString());
                }
                else
                {
                    response.code = 999;
                    response.message = String.Concat("NoOk - ", result[0].ToString());
                }
            }

            return response;
        }

        public ResponseDTO ModificarEstadoPedido(EstadoPedidoDTO estadoDTO)
        {
            ResponseDTO response = new ResponseDTO();
            _IResultlSetHelper.setDataSource(conectionString);

            string packageName = "pkg_iteracion_2";
            string procedureName = "MODIFICAR_ESTADO_PEDIDO";
            List<string> inParam = new List<string>();
            List<string> outParam = new List<string>();
            List<string> result = new List<string>();

            inParam.Add(estadoDTO.pedidoId.ToString());
            inParam.Add(estadoDTO.estadoId.ToString());

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

        public ListaPedidoDTO ListarPedidos(int estadoId)
        {
            ListaPedidoDTO response = new ListaPedidoDTO();
            PedidoOutDTO pedido = new PedidoOutDTO();
            response.listaPedido = new List<PedidoOutDTO>();

            _IResultlSetHelper.setDataSource(conectionString);
            var responseDTO = new ResponseDTO();

            string packageName = "pkg_iteracion_2";
            string procedureName = "LISTAR_PEDIDO";
            List<string> inParam = new List<string>();
            List<string> outParam = new List<string>();
            List<string> result = new List<string>();

            inParam.Add(estadoId.ToString());
            outParam.Add("o_cursor");
            outParam.Add("o_result");

            var oReader = _IResultlSetHelper.executePackage(packageName, procedureName, inParam, outParam, "o_cursor");

            if (oReader.Rows.Count > 0)
            {
                foreach (DataRow row in oReader.Rows)
                {
                    pedido = new PedidoOutDTO();
                    pedido.pedidoId = int.Parse(row[0].ToString());
                    pedido.mesaId = int.Parse(row[1].ToString());
                    pedido.usuarioId = int.Parse(row[2].ToString());
                    pedido.fechaPedido = row[3].ToString();
                    pedido.horaPedido = row[4].ToString();
                    pedido.estadoPedido = int.Parse(row[5].ToString());
                    pedido.categoriaProductoId = int.Parse(row[6].ToString());
                    pedido.categoriaNombre = row[7].ToString();
                    pedido.productoId = int.Parse(row[8].ToString());
                    pedido.nombreProducto = row[9].ToString();
                    pedido.cantidadProducto = int.Parse(row[10].ToString());
                    pedido.precioProducto = int.Parse(row[11].ToString());
                    pedido.observacionPedido = row[12].ToString();
                    response.listaPedido.Add(pedido);

                }
                response.code = 0;
                response.message = "OK";
            }
            else
            {
                response.code = 999;
                response.message = String.Concat("NoOk - ", result[2].ToString());
            }

            return response;
        }
    }
}