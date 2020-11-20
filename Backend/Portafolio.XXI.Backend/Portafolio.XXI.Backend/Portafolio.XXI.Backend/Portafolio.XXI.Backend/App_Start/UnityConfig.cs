using Portafolio.BL.Contracts;
using Portafolio.BL.Implementations;
using Portafolio.Infraestructure.Data.Contracts;
using Portafolio.Infraestructure.Data.Helper;
using Portafolio.Infraestructure.Data.HelperImpl;
using Portafolio.Infraestructure.Data.Implementation;
using System;
using Unity;
using Unity.Interception;
using Unity.Interception.ContainerIntegration;
using Unity.Interception.Interceptors.InstanceInterceptors.InterfaceInterception;

namespace Portafolio.XXI.Backend
{
    /// <summary>
    /// Specifies the Unity configuration for the main container.
    /// </summary>
    public static class UnityConfig
    {
        #region Unity Container
        private static Lazy<IUnityContainer> container =
          new Lazy<IUnityContainer>(() =>
          {
              var container = new UnityContainer();
              RegisterTypes(container);
              return container;
          });

        /// <summary>
        /// Configured Unity Container.
        /// </summary>
        public static IUnityContainer GetConfiguredContainer()
        {
            return container.Value;
        }
        #endregion

        /// <summary>
        /// Registers the type mappings with the Unity container.
        /// </summary>
        /// <param name="container">The unity container to configure.</param>
        /// <remarks>
        /// There is no need to register concrete types such as controllers or
        /// API controllers (unless you want to change the defaults), as Unity
        /// allows resolving a concrete type even if it was not previously
        /// registered.
        /// </remarks>
        public static void RegisterTypes(IUnityContainer container)
        {
            // NOTE: To load from web.config uncomment the line below.
            // Make sure to add a Unity.Configuration to the using statements.
            // container.LoadConfiguration();

            // TODO: Register your type's mappings here.
            container.AddNewExtension<Interception>()
                .RegisterType(typeof(IResultHelper),
                typeof(ResultHelper),
                new Interceptor<InterfaceInterceptor>()
                )
                .RegisterType(typeof(IDemo),
                typeof(DemoBL),
                new Interceptor<InterfaceInterceptor>()
                )
                .RegisterType(typeof(IDemoDAO),
                typeof(DemoDAO),
                new Interceptor<InterfaceInterceptor>()
                )
                .RegisterType(typeof(IAutentication),
                typeof(AutentificationBL),
                new Interceptor<InterfaceInterceptor>()
                )
                .RegisterType(typeof(IAutenticationDAO),
                typeof(AutenticationDAO),
                new Interceptor<InterfaceInterceptor>()
                )
                .RegisterType(typeof(IMesa),
                typeof(MesaBL),
                new Interceptor<InterfaceInterceptor>()
                )
                .RegisterType(typeof(IMesaDAO),
                typeof(MesaDAO),
                new Interceptor<InterfaceInterceptor>()
                )
                .RegisterType(typeof(IPedido),
                typeof(PedidoBL),
                new Interceptor<InterfaceInterceptor>()
                )
                .RegisterType(typeof(IPedidoDAO),
                typeof(PedidoDAO),
                new Interceptor<InterfaceInterceptor>()
                )
                .RegisterType(typeof(IReceta),
                typeof(RecetaBL),
                new Interceptor<InterfaceInterceptor>()
                )
                .RegisterType(typeof(IRecetaDAO),
                typeof(RecetaDAO),
                new Interceptor<InterfaceInterceptor>()
                )
                .RegisterType(typeof(IProducto),
                typeof(ProductoBL),
                new Interceptor<InterfaceInterceptor>()
                )
                .RegisterType(typeof(IProductoDAO),
                typeof(ProductoDAO),
                new Interceptor<InterfaceInterceptor>()
                )
                .RegisterType(typeof(IReserva),
                typeof(ReservaBL),
                new Interceptor<InterfaceInterceptor>()
                )
                .RegisterType(typeof(IReserveDAO),
                typeof(ReserveDAO),
                new Interceptor<InterfaceInterceptor>()
                )
                .RegisterType(typeof(ITrabajador),
                typeof(TrabajadorBL),
                new Interceptor<InterfaceInterceptor>()
                )
                .RegisterType(typeof(ITrabajadorDAO),
                typeof(TrabajadorDAO),
                new Interceptor<InterfaceInterceptor>()
                )
                ;
        }
    }
}