using Portafolio.Aplication.DTO;
using Portafolio.BL.Contracts;
using Portafolio.Infraestructure.Data.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.BL.Implementations
{
    public class PedidoBL : IPedido
    {
        IPedidoDAO _pedidoDAO;
        public PedidoBL(IPedidoDAO pedido)
        {
            this._pedidoDAO = pedido;
        }

        public ResponseDTO CrearPedido(IngresarPedidoDTO pedidoDTO)
        {
            return _pedidoDAO.CrearPedido(pedidoDTO);
        }

        public ResponseDTO ModificarEstadoPedido(EstadoPedidoDTO estadoDTO)
        {
            return _pedidoDAO.ModificarEstadoPedido(estadoDTO);
        }

        public ListaFinalPedidoDTO ListarPedidos(int estadoId)
        {
            ListaPedidoDTO resp = new ListaPedidoDTO();
            resp = _pedidoDAO.ListarPedidos(estadoId);

            ListaFinalPedidoDTO response = new ListaFinalPedidoDTO();
            response.listaPedidos = new List<PedidoListaDTO>();
            var primerPedido = new PedidoListaDTO();
            if(resp.code == 0 && resp.message.ToUpper() == "OK")
            {
                foreach (var pedido in resp.listaPedido)
                {
                    if (response.listaPedidos.Count < 1)
                    {
                        ComestibleDTO comestible = new ComestibleDTO();
                        BebestibleDTO bebestible = new BebestibleDTO();
                        primerPedido.pedidoId = pedido.pedidoId;
                        primerPedido.mesaId = pedido.mesaId;
                        primerPedido.usuarioId = pedido.usuarioId;
                        primerPedido.estadoPedido = pedido.estadoPedido;
                        primerPedido.listaComestible = new List<ComestibleDTO>();
                        primerPedido.listaBebestible = new List<BebestibleDTO>();
                        if (pedido.categoriaProductoId == 3) //Bebestibles
                        {
                            bebestible.categoriaProductoId = pedido.categoriaProductoId;
                            bebestible.categoriaNombre = pedido.categoriaNombre;
                            bebestible.idProducto = pedido.productoId;
                            bebestible.nombreProducto = pedido.nombreProducto;
                            bebestible.cantidadProducto = pedido.cantidadProducto;
                            bebestible.precioProducto = pedido.precioProducto;
                            bebestible.observacion = pedido.observacionPedido;
                            primerPedido.listaBebestible.Add(bebestible);
                        }
                        else if (pedido.categoriaProductoId == 1 || pedido.categoriaProductoId == 2) //Comestibles
                        {
                            comestible.categoriaProductoId = pedido.categoriaProductoId;
                            comestible.categoriaNombre = pedido.categoriaNombre;
                            comestible.idProducto = pedido.productoId;
                            comestible.nombreProducto = pedido.nombreProducto;
                            comestible.cantidadProducto = pedido.cantidadProducto;
                            comestible.precioProducto = pedido.precioProducto;
                            comestible.observacion = pedido.observacionPedido;
                            primerPedido.listaComestible.Add(comestible);
                        }
                        response.listaPedidos.Add(primerPedido);
                    }
                    else
                    {
                        var existe = false;
                        for (int i = 0; i < response.listaPedidos.Count; i++)
                        {
                            existe = response.listaPedidos[i].pedidoId == pedido.pedidoId ? true : existe;
                            ComestibleDTO comestible = new ComestibleDTO();
                            BebestibleDTO bebestible = new BebestibleDTO();
                            if (response.listaPedidos[i].pedidoId == pedido.pedidoId)
                            {
                                if (pedido.categoriaProductoId == 3)
                                {
                                    bebestible.categoriaProductoId = pedido.categoriaProductoId;
                                    bebestible.categoriaNombre = pedido.categoriaNombre;
                                    bebestible.idProducto = pedido.productoId;
                                    bebestible.nombreProducto = pedido.nombreProducto;
                                    bebestible.cantidadProducto = pedido.cantidadProducto;
                                    bebestible.precioProducto = pedido.precioProducto;
                                    bebestible.observacion = pedido.observacionPedido;
                                    response.listaPedidos[i].listaBebestible.Add(bebestible);
                                }
                                else if (pedido.categoriaProductoId == 1 || pedido.categoriaProductoId == 2) //Comestibles
                                {
                                    comestible.categoriaProductoId = pedido.categoriaProductoId;
                                    comestible.categoriaNombre = pedido.categoriaNombre;
                                    comestible.idProducto = pedido.productoId;
                                    comestible.nombreProducto = pedido.nombreProducto;
                                    comestible.cantidadProducto = pedido.cantidadProducto;
                                    comestible.precioProducto = pedido.precioProducto;
                                    comestible.observacion = pedido.observacionPedido;
                                    response.listaPedidos[i].listaComestible.Add(comestible);
                                }
                                break;
                            }
                        }
                        if (!existe)
                        {
                            ComestibleDTO comestible = new ComestibleDTO();
                            BebestibleDTO bebestible = new BebestibleDTO();
                            var nuevoPedido = new PedidoListaDTO();
                            nuevoPedido.pedidoId = pedido.pedidoId;
                            nuevoPedido.mesaId = pedido.mesaId;
                            nuevoPedido.usuarioId = pedido.usuarioId;
                            nuevoPedido.estadoPedido = pedido.estadoPedido;
                            nuevoPedido.listaComestible = new List<ComestibleDTO>();
                            nuevoPedido.listaBebestible = new List<BebestibleDTO>();
                            if (pedido.categoriaProductoId == 3) //Bebestibles
                            {
                                bebestible.categoriaProductoId = pedido.categoriaProductoId;
                                bebestible.categoriaNombre = pedido.categoriaNombre;
                                bebestible.idProducto = pedido.productoId;
                                bebestible.nombreProducto = pedido.nombreProducto;
                                bebestible.cantidadProducto = pedido.cantidadProducto;
                                bebestible.precioProducto = pedido.precioProducto;
                                bebestible.observacion = pedido.observacionPedido;
                                nuevoPedido.listaBebestible.Add(bebestible);
                            }
                            else if (pedido.categoriaProductoId == 1 || pedido.categoriaProductoId == 2) //Comestibles
                            {
                                comestible.categoriaProductoId = pedido.categoriaProductoId;
                                comestible.categoriaNombre = pedido.categoriaNombre;
                                comestible.idProducto = pedido.productoId;
                                comestible.nombreProducto = pedido.nombreProducto;
                                comestible.cantidadProducto = pedido.cantidadProducto;
                                comestible.precioProducto = pedido.precioProducto;
                                comestible.observacion = pedido.observacionPedido;
                                nuevoPedido.listaComestible.Add(comestible);
                            }
                            response.listaPedidos.Add(nuevoPedido);
                        }

                        //response.listaPedidos.Add(nuevo);
                    }
                    
                }
            }
            return response;

        }
    }
}