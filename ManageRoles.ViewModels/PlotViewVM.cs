using SRMIS.MODEL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageRoles.ViewModels
{
    public class PlotViewVM
    {
        public List<MauzaInfoTbl> Mauzas { get; set; }

        public int MauzaID { get; set; }

        public int KhewatID { get; set; }

        public int KhasraID { get; set; }

        public string PlotName { get; set; }

        public List <PlotTypeInfoTbl> PlotTypes{ get; set; }

        public int PlotTypeID { get; set; }

        public double PlotArea { get; set; }
    }
}
