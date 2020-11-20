using Portafolio.Infraestructure.Data.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Aplication.DTO
{
    public class ProfileDTO : ResponseDTO
    {
        public int profileId { get; set; }
        public string name { get; set; }
        public List<FunctionalityDTO> functionalityList { get; set; }
    }
}