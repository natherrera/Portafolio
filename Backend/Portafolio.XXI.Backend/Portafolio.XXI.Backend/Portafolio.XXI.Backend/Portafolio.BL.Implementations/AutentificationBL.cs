using Portafolio.Aplication.DTO;
using Portafolio.BL.Contracts;
using Portafolio.Infraestructure.Data.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.BL.Implementations
{
    public class AutentificationBL : IAutentication
    {
        IAutenticationDAO _autenticationDAO;
        public AutentificationBL(IAutenticationDAO autentication)
        {
            this._autenticationDAO = autentication;
        }
        public ResponseDTO createUser(CreateUserDTO createUserDTO)
        {
            return _autenticationDAO.createUser(createUserDTO);
        }

        public ProfileDTO userAutentification(UserAutentificationDTO userAutentificationDTO)
        {
            ProfileDTO resp = new ProfileDTO();
            resp = _autenticationDAO.userAutentification(userAutentificationDTO);

            if (resp.message.ToUpper().Equals("OK") && resp.code == 0)
            {
                resp.functionalityList = this.GetFunctionalities(resp.profileId);
            }

            return resp;
        }

        public List<FunctionalityDTO> GetFunctionalities(int profileId)
        {
            return _autenticationDAO.getFunctionalities(profileId);
        }
    }
}