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
    public class InsumoDAO : IInsumoDAO
    {
        string conectionString = ConfigurationManager.ConnectionStrings["BBDD"].ConnectionString;
        private readonly IResultHelper _IResultlSetHelper;
        public InsumoDAO(IResultHelper IResultlSetHelper)
        {
            _IResultlSetHelper = IResultlSetHelper;
        }

        public ResponseDTO CrearInsumo(CrearInsumoDTO insumoDTO)
        {
            ResponseDTO response = new ResponseDTO();

            _IResultlSetHelper.setDataSource(conectionString);
            var responseDTO = new ResponseDTO();

            string packageName = "pkg_iteracion_2";
            string procedureName = "INSERTAR_INSUMO";
            List<string> inParam = new List<string>();
            List<string> outParam = new List<string>();
            List<string> result = new List<string>();

            inParam.Add(insumoDTO.nombre);
            inParam.Add(insumoDTO.marca.ToString());
            inParam.Add(insumoDTO.categoriaInsumo.ToString());
            inParam.Add(insumoDTO.isActivo.ToString());
            inParam.Add(insumoDTO.precio.ToString());
            inParam.Add(insumoDTO.unidadMedida.ToString());
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

        public ResponseDTO ModificarInsumo(CrearInsumoDTO insumoDTO)
        {
            ResponseDTO response = new ResponseDTO();

            _IResultlSetHelper.setDataSource(conectionString);
            var responseDTO = new ResponseDTO();

            string packageName = "pkg_iteracion_2";
            string procedureName = "MODIFICAR_INSUMO";
            List<string> inParam = new List<string>();
            List<string> outParam = new List<string>();
            List<string> result = new List<string>();

            inParam.Add(insumoDTO.idInsumo.ToString());
            inParam.Add(insumoDTO.nombre);
            inParam.Add(insumoDTO.marca);
            inParam.Add(insumoDTO.categoriaInsumo.ToString());
            inParam.Add(insumoDTO.isActivo.ToString());
            inParam.Add(insumoDTO.precio.ToString());
            inParam.Add(insumoDTO.unidadMedida.ToString());
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

        public ResponseDTO EliminarInsumo(int insumoId)
        {
            ResponseDTO response = new ResponseDTO();

            _IResultlSetHelper.setDataSource(conectionString);
            var responseDTO = new ResponseDTO();

            string packageName = "pkg_iteracion_2";
            string procedureName = "ELIMINAR_INSUMO";
            List<string> inParam = new List<string>();
            List<string> outParam = new List<string>();
            List<string> result = new List<string>();

            inParam.Add(insumoId.ToString());
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

        public ListaInsumoOutDTO ListarInsumo(int categoriaInsumoId)
        {
            ListaInsumoOutDTO response = new ListaInsumoOutDTO();
            InsumoOutDTO insumo = new InsumoOutDTO();
            response.listaInsumos = new List<InsumoOutDTO>();
            _IResultlSetHelper.setDataSource(conectionString);
            var responseDTO = new ResponseDTO();

            string packageName = "pkg_iteracion_2";
            string procedureName = "LISTAR_INSUMO";
            List<string> inParam = new List<string>();
            List<string> outParam = new List<string>();
            List<string> result = new List<string>();

            inParam.Add(categoriaInsumoId.ToString());
            outParam.Add("o_cursor");
            outParam.Add("o_error");

            var oReader = _IResultlSetHelper.executePackage(packageName, procedureName, inParam, outParam, "o_cursor");

            if (oReader.Rows.Count > 0)
            {
                foreach (DataRow row in oReader.Rows)
                {
                    insumo.insumoId = int.Parse(row[0].ToString());
                    insumo.nombre = row[1].ToString();
                    insumo.marca = row[2].ToString();
                    insumo.categoriaInsumo = row[3].ToString();
                    insumo.precio = int.Parse(row[4].ToString());
                    insumo.unidadMedida = row[5].ToString();
                    response.listaInsumos.Add(insumo);

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