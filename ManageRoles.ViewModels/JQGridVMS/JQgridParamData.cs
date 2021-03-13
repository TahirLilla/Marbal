using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageRoles.ViewModels
{
    public class JQgridParamData
    {
        //for sorting
        public string sidx { get; set; }
        //it is for ordering
        public string sord { get; set; }
        //current page number
        public int page { get; set; }

        public int rows { get; set; }
        //unique key ID
        public int id { get; set; }

        //id: "_rowid", page: "_page", rows: "_rows",
        //oper: "_oper", sort: "_sidx", order: "_sord"
    }
}
