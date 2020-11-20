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
    public class ReserveDAO : IReserveDAO
    {
        string conectionString = ConfigurationManager.ConnectionStrings["BBDD"].ConnectionString;
        private readonly IResultHelper _IResultlSetHelper;
        public ReserveDAO(IResultHelper IResultlSetHelper)
        {
            _IResultlSetHelper = IResultlSetHelper;
        }

        public ResponseDTO CreateReserve(CreateReserveDTO createReserveDTO)
        {
            ResponseDTO response = new ResponseDTO();
            _IResultlSetHelper.setDataSource(conectionString);

            string packageName = "pkg_iteracion_2";
            string procedureName = "INSERTAR_RESERVA";
            List<string> inParam = new List<string>();
            List<string> outParam = new List<string>();
            List<string> result = new List<string>();

            inParam.Add(createReserveDTO.isTotem);
            inParam.Add(createReserveDTO.cantPerson.ToString());
            inParam.Add(createReserveDTO.reserveDate);
            inParam.Add(createReserveDTO.usuarioEmail);
            inParam.Add(createReserveDTO.usuarioFono.ToString());

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

        public ResponseDTO CancelReserve(int idReserve)
        {
            ResponseDTO response = new ResponseDTO();
            _IResultlSetHelper.setDataSource(conectionString);

            string packageName = "pkg_iteracion_2";
            string procedureName = "CANCELAR_RESERVA";
            List<string> inParam = new List<string>();
            List<string> outParam = new List<string>();
            List<string> result = new List<string>();

            inParam.Add(idReserve.ToString());

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

        public List<ListarReservaDTO> ListarReserva(string usuarioEmail)
        {
            List<ListarReservaDTO> response = new List<ListarReservaDTO>();
            ListarReservaDTO reserva = null;
            _IResultlSetHelper.setDataSource(conectionString);

            string packageName = "pkg_iteracion_2";
            string procedureName = "LISTAR_RESERVA";
            List<string> inParam = new List<string>();
            List<string> outParam = new List<string>();
            List<string> result = new List<string>();

            inParam.Add(usuarioEmail);

            outParam.Add("o_result");

            result = _IResultlSetHelper.executePackage(packageName, procedureName, inParam, outParam);

            var oReader = _IResultlSetHelper.executePackage(packageName, procedureName, inParam, outParam, "o_cursor");

            if (oReader.Rows.Count > 0)
            {
                foreach (DataRow row in oReader.Rows)
                {
                    reserva = new ListarReservaDTO();
                    reserva.reservaId = int.Parse(row[0].ToString());
                    reserva.numeroFolio = int.Parse(row[1].ToString());
                    reserva.estadoReserva = row[2].ToString();
                    reserva.cantidadPersonas = int.Parse(row[3].ToString());
                    reserva.fechaReserva = row[4].ToString();
                    reserva.fechaRegistro = row[5].ToString();
                    reserva.usuarioEmail = row[6].ToString();
                    reserva.usuarioFono = int.Parse(row[7].ToString());

                    response.Add(reserva);
                }
            }

            return response;
        }
    }
}