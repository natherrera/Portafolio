using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace Portafolio.Infraestructure.Data.Helper
{
    public interface IResultHelper
    {
        void setDataSource(string datSource);
        List<string> executePackage(String packageName, String procedureName, List<string> inParam, List<string> outParam);
        DataTable executePackage(String packageName, String procedureName, List<string> inParam, List<string> outParam, string cursorName);
    }
}