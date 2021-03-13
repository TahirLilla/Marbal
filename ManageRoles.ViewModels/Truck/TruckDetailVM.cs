using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageRoles.ViewModels
{
    public class TruckDetailVM
    {
        public int ID { get; set; }
        public int TruckID { get; set; }
        public string ProductName { get; set; }
        public string CategoryName { get; set; }
        public int Length { get; set; }
        public int Width { get; set; }
        public int Breadth { get; set; }
        public int Count { get; set; }
        public int  ProductID { get; set; }
    }
}
