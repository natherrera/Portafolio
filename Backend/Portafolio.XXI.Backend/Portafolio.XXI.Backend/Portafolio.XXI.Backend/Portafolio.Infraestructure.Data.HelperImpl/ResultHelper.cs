using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using Portafolio.Infraestructure.Data.Helper;
using Oracle.DataAccess.Client;
using Oracle.DataAccess.Types;

namespace Portafolio.Infraestructure.Data.HelperImpl
{
    public class ResultHelper : IResultHelper
    {
        public string _dataSource;

        public void setDataSource(string dataSource)
        {
            _dataSource = dataSource;
        }


        public List<string> executePackage(String packageName, String procedureName, List<string> inParam, List<string> outParam)
        {
            var parametersDTO = getOracleParameters(packageName, procedureName);
            List<string> vOutParam = new List<string>(outParam.Count);
            StringBuilder sbConexion = new StringBuilder();
            string strConexion = _dataSource;
            OracleConnection conn = new OracleConnection(strConexion); // C#
            conn.Open();
            OracleCommand cmd = new OracleCommand();
            cmd.Connection = conn;
            cmd.CommandText = packageName + "." + procedureName;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd = createOracleParameters(parametersDTO, inParam, outParam, cmd);

            cmd.ExecuteNonQuery();
            conn.Close();

            for (int fila = inParam.Count; fila < inParam.Count + outParam.Count; fila++)
            {
                vOutParam.Add(cmd.Parameters[fila].Value.ToString());
            }

            return vOutParam;

        }

        public DataTable executePackage(String packageName, String procedureName, List<string> inParam, List<string> outParam, string cursorName)
        {
            var parametersDTO = getOracleParameters(packageName, procedureName);
            List<string> vOutParam = new List<string>(outParam.Count);
            string strConexion = _dataSource;
            OracleConnection conn = new OracleConnection(strConexion); // C#
            conn.Open();
            OracleCommand cmd = new OracleCommand();
            cmd.Connection = conn;
            cmd.CommandText = packageName + "." + procedureName;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd = createOracleParameters(parametersDTO, inParam, outParam, cmd);
            cmd.ExecuteNonQuery();
            var cmmd = cmd;
            var oracleRefCursor = cmmd.Parameters[cursorName].Value;

            OracleDataReader dr = ((OracleRefCursor)oracleRefCursor).GetDataReader();


            var dataTable = new DataTable();
            dataTable.Load(dr);


            conn.Close();
            return dataTable;

        }





        private OracleCommand createOracleParameters(ParametersDTO[] parametros, List<string> inParam, List<string> outParam, OracleCommand cmd)
        {

            var localCmd = cmd;

            for (int fila = 0; fila < parametros.Length; fila++)
            {

                if (parametros[fila] != null && parametros[fila].inOut.Equals("IN") || parametros[fila] != null && parametros[fila].inOut.Equals("IN/OUT"))
                {
                    var iParameter = new OracleParameter(parametros[fila].argumentName, GetOracleDBType(parametros[fila].dataType), ParameterDirection.Input);
                    if (parametros[fila].dataType == "DATE")
                    {
                        if (!inParam[fila].Equals(string.Empty))
                        {
                            iParameter.Value = Convert.ToDateTime(inParam[fila]);
                        }
                        else
                        {
                            iParameter.Value = null;
                        }
                    }
                    if (parametros[fila].dataType == "NUMBER")
                    {
                        if (!inParam[fila].Equals(string.Empty))
                        {
                            iParameter.Value = Convert.ToInt32(inParam[fila]);
                        }
                        else
                        {
                            iParameter.Value = null;
                        }
                    }
                    else
                    {
                        iParameter.Value = inParam[fila];
                    }
                    localCmd.Parameters.Add(iParameter);
                }
                else
                {
                    var oParameter = new OracleParameter(parametros[fila].argumentName, GetOracleDBType(parametros[fila].dataType), parametros[fila].dataLength == 0 ? 255 : parametros[fila].dataLength, null, ParameterDirection.Output);
                    localCmd.Parameters.Add(oParameter);
                }
            }

            return localCmd;

        }

        public class ParametersDTO
        {

            public string argumentName { get; set; }
            public string dataType { get; set; }
            public int dataLength { get; set; }
            public int dataPrecision { get; set; }
            public string plsType { get; set; }
            public int position { get; set; }
            public string inOut { get; set; }

        }

        private ParametersDTO[] getOracleParameters(string package, string procedure)
        {


            var strSqlParameters = "SELECT ARGUMENT_NAME, DATA_TYPE, nvl(DATA_LENGTH,'') DATA_LENGTH, nvl(DATA_PRECISION,'') , PLS_TYPE,POSITION, " +
                                   " IN_OUT FROM USER_ARGUMENTS WHERE package_name = upper(:package) AND upper(OBJECT_NAME) = upper(:procedure) " +
                                   "ORDER BY POSITION, IN_OUT";

            //string connectionString = "DATA SOURCE=localhost:1521/xe;PERSIST SECURITY INFO=True;USER ID=Portafolio;Password=1234;";

            OracleConnection conn = new OracleConnection(_dataSource); // C#
            //OracleConnection conn = new OracleConnection(connectionString); */// C#
            conn.Open();
            OracleCommand cmd = new OracleCommand();
            cmd.Connection = conn;
            cmd.CommandText = strSqlParameters;
            cmd.CommandType = CommandType.Text;

            cmd.Parameters.Add(new OracleParameter("package", package));
            cmd.Parameters.Add(new OracleParameter("procedure", procedure));

            OracleDataReader dataReader = cmd.ExecuteReader();

            List<ParametersDTO> listParametersDTO = new List<ParametersDTO>();
            var parametersDTO = new ParametersDTO();
            int fila = 0;
            while (dataReader.Read())
            {
                parametersDTO = new ParametersDTO();
                parametersDTO.argumentName = dataReader.GetString(0);
                parametersDTO.dataType = dataReader.GetString(1);
                //if (parametersDTO.dataType.Equals("NUMBER"))
                //{
                parametersDTO.dataLength = dataReader.GetValue(2).ToString() != "" ? Int16.Parse(dataReader.GetValue(2).ToString()) : 0;
                parametersDTO.dataPrecision = dataReader.GetValue(3).ToString().Length > 0 ? Int16.Parse(dataReader.GetValue(3).ToString()) : 0;
                //}
                //else {
                //    parametersDTO.dataLength = 0;
                //    parametersDTO.dataPrecision = 0;
                //}
                if (!parametersDTO.dataType.Equals("REF CURSOR"))
                    parametersDTO.plsType = dataReader.GetString(4);
                else
                    parametersDTO.plsType = "";
                parametersDTO.position = Int16.Parse(dataReader.GetValue(5).ToString());
                parametersDTO.inOut = dataReader.GetValue(6).ToString().Length > 0 ? dataReader.GetValue(6).ToString() : "0";
                listParametersDTO.Add(parametersDTO);
                fila++;
            }
            dataReader.Dispose();
            conn.Close();

            var arrParametersDTO = listParametersDTO.ToArray();

            return arrParametersDTO;

        }



        private OracleDbType GetOracleDBType(string typeName)
        {

            var sType = String.Intern(typeName);

            if (object.ReferenceEquals(sType, "CHAR"))
            {
                return OracleDbType.Char;
            }
            else if (object.ReferenceEquals(sType, "VARCHAR2"))
            {
                return OracleDbType.Varchar2;
            }
            else if (object.ReferenceEquals(sType, "NUMBER"))
            {
                return OracleDbType.Decimal;
            }
            else if (object.ReferenceEquals(sType, "DATE"))
            {
                return OracleDbType.Date;
            }
            else if (object.ReferenceEquals(sType, "BFILE"))
            {
                return OracleDbType.BFile;
            }
            else if (object.ReferenceEquals(sType, "BLOB"))
            {
                return OracleDbType.Blob;
            }
            else if (object.ReferenceEquals(sType, "CLOB"))
            {
                return OracleDbType.Clob;
            }
            else if (object.ReferenceEquals(sType, "FLOAT"))
            {
                return OracleDbType.Double;
            }
            else if (object.ReferenceEquals(sType, "INTERVAL DAY TO SECOND"))
            {
                return OracleDbType.IntervalDS;
            }
            else if (object.ReferenceEquals(sType, "INTERVAL YEAR TO MONTH"))
            {
                return OracleDbType.IntervalYM;
            }
            else if (object.ReferenceEquals(sType, "LONG RAW"))
            {
                return OracleDbType.LongRaw;
            }
            else if (object.ReferenceEquals(sType, "NCHAR"))
            {
                return OracleDbType.NChar;
            }
            else if (object.ReferenceEquals(sType, "NCLOB"))
            {
                return OracleDbType.NClob;
            }
            else if (object.ReferenceEquals(sType, "NVARCHAR2"))
            {
                return OracleDbType.NVarchar2;
            }
            else if (object.ReferenceEquals(sType, "RAW"))
            {
                return OracleDbType.Raw;
            }
            else if (object.ReferenceEquals(sType, "REF CURSOR"))
            {
                return OracleDbType.RefCursor;
            }
            else if (object.ReferenceEquals(sType, "TIME"))
            {
                throw new NotSupportedException(typeName);
            }
            else if (object.ReferenceEquals(sType, "TIMESTAMP WITH LOCAL TIME ZONE"))
            {
                return OracleDbType.TimeStampLTZ;
            }
            else if (object.ReferenceEquals(sType, "TIMESTAMP WITH TIME ZONE"))
            {
                return OracleDbType.TimeStampTZ;
            }
            else if (object.ReferenceEquals(sType, "TIMESTAMP"))
            {
                return OracleDbType.TimeStamp;
            }
            else
            {
                throw new NotSupportedException(typeName);
            }

        }
    }
}