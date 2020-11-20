using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Aplication.DTO
{
    public class CreateUserDTO
    {
        public string rut { get; set; }
        public string name { get; set; }
        public string lastName { get; set; }
        public string motherName { get; set; }
        public string birthdate { get; set; }
        public int sexId { get; set; }
        public string email { get; set; }
        public string password { get; set; }
    }
}