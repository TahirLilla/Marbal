using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace ManageRoles.Models
{
    public class FilesDataModel
    {
        public int ID { get; set; }
        public int TypeID { get; set; }
        public int ProcessID { get; set; }
        public HttpPostedFileBase FileData { get; set; }
    }
}
