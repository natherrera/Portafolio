﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portafolio.Aplication.DTO
{
    public class ModificarProductoDTO
    {
        public int? productoId { get; set; }
        public string nombre { get; set; }
        public int precio { get; set; }
        public string descripcion { get; set; }
        public int categoriaId { get; set; }
    }
}