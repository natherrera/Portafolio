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
    public class AutenticationDAO : IAutenticationDAO
    {
        string conectionString = ConfigurationManager.ConnectionStrings["BBDD"].ConnectionString;
        private readonly IResultHelper _IResultlSetHelper;
        public AutenticationDAO(IResultHelper IResultlSetHelper)
        {
            _IResultlSetHelper = IResultlSetHelper;
        }

        public ResponseDTO createUser(CreateUserDTO createUserDTO)
        {
            ResponseDTO response = new ResponseDTO();

            _IResultlSetHelper.setDataSource(conectionString);
            var responseDTO = new ResponseDTO();

            string packageName = "pkg_iteracion_1";
            string procedureName = "CREATE_USER";
            List<string> inParam = new List<string>();
            List<string> outParam = new List<string>();
            List<string> result = new List<string>();
            
            inParam.Add(createUserDTO.rut);
            inParam.Add(createUserDTO.name);
            inParam.Add(createUserDTO.lastName);
            inParam.Add(createUserDTO.motherName);
            inParam.Add(createUserDTO.birthdate);
            inParam.Add(createUserDTO.sexId.ToString());
            inParam.Add(createUserDTO.email);
            inParam.Add(createUserDTO.password);
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

        public ProfileDTO userAutentification(UserAutentificationDTO userAutentificationDTO)
        {
            ProfileDTO response = new ProfileDTO();

            _IResultlSetHelper.setDataSource(conectionString);
            var responseDTO = new ResponseDTO();

            string packageName = "pkg_iteracion_1";
            string procedureName = "USER_AUTHENTICATION";
            List<string> inParam = new List<string>();
            List<string> outParam = new List<string>();
            List<string> result = new List<string>();

            inParam.Add(userAutentificationDTO.token);
            inParam.Add(userAutentificationDTO.email);
            inParam.Add(userAutentificationDTO.password);
            outParam.Add("o_cursor");
            outParam.Add("o_error");

            var oReader = _IResultlSetHelper.executePackage(packageName, procedureName, inParam, outParam, "o_cursor");

            if (oReader.Rows.Count > 0)
            {
                foreach (DataRow row in oReader.Rows)
                {
                    response.profileId = int.Parse(row[0].ToString());
                    response.name = row[1].ToString();

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

        public List<FunctionalityDTO> getFunctionalities(int profileId)
        {
            List<FunctionalityDTO> response = new List<FunctionalityDTO>();
            FunctionalityDTO functionality = new FunctionalityDTO();

            _IResultlSetHelper.setDataSource(conectionString);
            var responseDTO = new ResponseDTO();

            string packageName = "pkg_iteracion_1";
            string procedureName = "CREATE_USER";
            List<string> inParam = new List<string>();
            List<string> outParam = new List<string>();
            List<string> result = new List<string>();

            inParam.Add(profileId.ToString());
            outParam.Add("o_cursor");

            var oReader = _IResultlSetHelper.executePackage(packageName, procedureName, inParam, outParam, "o_cursor");

            if (oReader.Rows.Count > 0)
            {
                foreach (DataRow row in oReader.Rows)
                {
                    functionality.functionalityName = row[1].ToString();
                    response.Add(functionality);

                }
                functionality.code = 0;
                functionality.message = "OK";
            }
            else
            {
                functionality.code = 999;
                functionality.message = String.Concat("NoOk - ", result[2].ToString());
            }

            return response;
        }

    }
}