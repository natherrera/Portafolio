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
    public class MesaDAO : IMesaDAO
    {
        string conectionString = ConfigurationManager.ConnectionStrings["BBDD"].ConnectionString;
        private readonly IResultHelper _IResultlSetHelper;
        public MesaDAO(IResultHelper IResultlSetHelper)
        {
            _IResultlSetHelper = IResultlSetHelper;
        }

        public ResponseDTO CrearMesa(CrearMesaDTO mesaDTO)
        {
            ResponseDTO response = new ResponseDTO();

            _IResultlSetHelper.setDataSource(conectionString);
            var responseDTO = new ResponseDTO();

            string packageName = "pkg_iteracion_2";
            string procedureName = "INSERTAR_MESA";
            List<string> inParam = new List<string>();
            List<string> outParam = new List<string>();
            List<string> result = new List<string>();

            inParam.Add(mesaDTO.nombre);
            inParam.Add(mesaDTO.cantidadPersonas.ToString());
            inParam.Add(mesaDTO.estadoMesa.ToString());
            inParam.Add(mesaDTO.categoriaMesa.ToString());
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

        public ResponseDTO ModificarMesa(CrearMesaDTO mesaDTO)
        {
            ResponseDTO response = new ResponseDTO();

            _IResultlSetHelper.setDataSource(conectionString);
            var responseDTO = new ResponseDTO();

            string packageName = "pkg_iteracion_2";
            string procedureName = "MODIFICAR_MESA";
            List<string> inParam = new List<string>();
            List<string> outParam = new List<string>();
            List<string> result = new List<string>();

            inParam.Add(mesaDTO.idMesa.ToString());
            inParam.Add(mesaDTO.nombre);
            inParam.Add(mesaDTO.cantidadPersonas.ToString());
            inParam.Add(mesaDTO.estadoMesa.ToString());
            inParam.Add(mesaDTO.categoriaMesa.ToString());
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

        public ResponseDTO EliminarMesa(int mesaId)
        {
            ResponseDTO response = new ResponseDTO();

            _IResultlSetHelper.setDataSource(conectionString);
            var responseDTO = new ResponseDTO();

            string packageName = "pkg_iteracion_2";
            string procedureName = "ELIMINAR_MESA";
            List<string> inParam = new List<string>();
            List<string> outParam = new List<string>();
            List<string> result = new List<string>();

            inParam.Add(mesaId.ToString());
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

        public ListaMesaOutDTO ListarMesa(int estadoMesaId)
        {
            ListaMesaOutDTO response = new ListaMesaOutDTO();
            MesaOutDTO mesa = new MesaOutDTO();
            response.listaMesas = new List<MesaOutDTO>();
            _IResultlSetHelper.setDataSource(conectionString);
            var responseDTO = new ResponseDTO();

            string packageName = "pkg_iteracion_2";
            string procedureName = "LISTAR_MESAS";
            List<string> inParam = new List<string>();
            List<string> outParam = new List<string>();
            List<string> result = new List<string>();

            inParam.Add(estadoMesaId.ToString());
            outParam.Add("o_cursor");
            outParam.Add("o_error");

            var oReader = _IResultlSetHelper.executePackage(packageName, procedureName, inParam, outParam, "o_cursor");

            if (oReader.Rows.Count > 0)
            {
                foreach (DataRow row in oReader.Rows)
                {
                    mesa.mesaId = int.Parse(row[0].ToString());
                    mesa.nombre = row[1].ToString();
                    mesa.cantidadPersonas = int.Parse(row[2].ToString());
                    mesa.estadoMesa = row[3].ToString();
                    mesa.ubicacionMesa = row[4].ToString();
                    response.listaMesas.Add(mesa);

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