using Portafolio.Aplication.DTO;
using Portafolio.Infraestructure.Data.Contracts;
using Portafolio.Infraestructure.Data.Helper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portafolio.Infraestructure.Data.Implementation
{
    public class TrabajadorDAO : ITrabajadorDAO
    {
        string conectionString = ConfigurationManager.ConnectionStrings["BBDD"].ConnectionString;
        private readonly IResultHelper _IResultlSetHelper;
        public TrabajadorDAO(IResultHelper IResultlSetHelper)
        {
            _IResultlSetHelper = IResultlSetHelper;
        }

        public InsertarTrabajadorOutDTO InsertarTrabajador(InsertarTrabajadorInDTO trabajadorDTO)
        {
            InsertarTrabajadorOutDTO response = new InsertarTrabajadorOutDTO();
            _IResultlSetHelper.setDataSource(conectionString);

            string packageName = "pkg_iteracion_2";
            string procedureName = "INSERTAR_TRABAJADOR";
            List<string> inParam = new List<string>();
            List<string> outParam = new List<string>();
            List<string> result = new List<string>();

            inParam.Add(trabajadorDTO.rut.ToString());
            inParam.Add(trabajadorDTO.nombre);
            inParam.Add(trabajadorDTO.apellidoPat);
            inParam.Add(trabajadorDTO.apellidoMat);
            inParam.Add(trabajadorDTO.fechaNacimiento);
            inParam.Add(trabajadorDTO.sexoId.ToString());
            inParam.Add(trabajadorDTO.perfilId.ToString());

            outParam.Add("o_result");
            outParam.Add("o_usuario");
            outParam.Add("o_password");

            result = _IResultlSetHelper.executePackage(packageName, procedureName, inParam, outParam);

            if (result[0].ToString().Equals("OK"))
            {
                response.code = 0;
                response.message = "OK";
                response.correoUsuario = result[1].ToString();
                response.password = result[2].ToString();
            }
            else
            {
                response.code = 999;
                response.message = String.Concat("NoOk - ", result[0].ToString());
            }

            return response;
        }
    }
}
