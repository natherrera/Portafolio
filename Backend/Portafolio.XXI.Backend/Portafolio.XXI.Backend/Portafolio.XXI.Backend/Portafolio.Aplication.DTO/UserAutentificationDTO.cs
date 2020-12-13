using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Aplication.DTO
{
    public class UserAutentificationDTO
    {
        public string token { get; set; }
        public string email { get; set; }
        public string password { get; set; }
    }
}