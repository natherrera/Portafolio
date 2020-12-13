using Portafolio.Aplication.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Infraestructure.Data.Contracts
{
    public interface IAutenticationDAO
    {
        ResponseDTO createUser(CreateUserDTO createUserDTO);
        ProfileDTO userAutentification(UserAutentificationDTO userAutentificationDTO);
        List<FunctionalityDTO> getFunctionalities(int profileId);
    }
}