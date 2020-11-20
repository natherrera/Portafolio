using System.Web;
using System.Web.Mvc;

namespace Portafolio.BL.Implementation
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
