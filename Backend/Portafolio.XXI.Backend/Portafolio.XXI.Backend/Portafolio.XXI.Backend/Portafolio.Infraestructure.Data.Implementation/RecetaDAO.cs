using Portafolio.Aplication.DTO;
using Portafolio.Infraestructure.Data.Contracts;
using Portafolio.Infraestructure.Data.Helper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Portafolio.Infraestructure.Data.Implementation
{
    public class RecetaDAO : IRecetaDAO
    {
        string conectionString = ConfigurationManager.ConnectionStrings["BBDD"].ConnectionString;
        private readonly IResultHelper _IResultlSetHelper;
        public RecetaDAO(IResultHelper IResultlSetHelper)
        {
            _IResultlSetHelper = IResultlSetHelper;
        }

        public ResponseDTO CrearReceta(IngresarRecetaDTO recetaDTO)
        {
            ResponseDTO response = new ResponseDTO();
            _IResultlSetHelper.setDataSource(conectionString);

            string packageName = "pkg_iteracion_2";
            string procedureName = "INSERTAR_RECETA";
            List<string> inParam = new List<string>();
            List<string> outParam = new List<string>();
            List<string> result = new List<string>();

            foreach (var insumo in recetaDTO.listaInsumo)
            {
                inParam = new List<string>();
                outParam = new List<string>();
                result = new List<string>();

                inParam.Add(recetaDTO.productoId.ToString());
                inParam.Add(insumo.cantidad.ToString());
                inParam.Add(insumo.unidadMedidaId.ToString());
                inParam.Add(insumo.insumoId.ToString());

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
            }

            return response;
        }
    }
}