using Portafolio.Aplication.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.BL.Contracts
{
    public interface IAutentication
    {
        ResponseDTO createUser(CreateUserDTO createUserDTO);
        ProfileDTO userAutentification(UserAutentificationDTO userAutentificationDTO);
    }
}