using Portafolio.Aplication.DTO;
using Portafolio.Infraestructure.Data.Contracts;
using Portafolio.Infraestructure.Data.Helper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Web;

namespace Portafolio.Infraestructure.Data.Implementation
{
    public class DemoDAO : IDemoDAO
    {
        string conectionString = ConfigurationManager.AppSettings["BBDD"];
        private readonly IResultHelper _IResultlSetHelper;
        public DemoDAO(IResultHelper IResultlSetHelper)
        {
            _IResultlSetHelper = IResultlSetHelper;
        }

        public ResponseDTO flow(int numero)
        {
            ResponseDTO response = new ResponseDTO();

            _IResultlSetHelper.setDataSource(conectionString);
            var responseDTO = new ResponseDTO();

            string packageName = "PKG_TEST";
            string procedureName = "TEST1";
            List<string> inParam = new List<string>();
            List<string> outParam = new List<string>();
            List<string> result = new List<string>();

            inParam.Add(numero.ToString());
            outParam.Add("o_result");

            result = _IResultlSetHelper.executePackage(packageName, procedureName, inParam, outParam);

            if (result[0].ToString().Equals("0"))
            {
                response.code = 999;
                response.message = "NoOk";
            }
            else
            {
                response.code = 0;
                response.message = "OK";
            }

            return response;
        }
    }
}