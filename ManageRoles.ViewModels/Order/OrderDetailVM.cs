using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ManageRoles.Models;

namespace ManageRoles.ViewModels
{
    public class OrderDetailVM
    {
        public string Detail { get; set; }
        public int Length { get; set; }
        public int Width { get; set; }
        public int ProductID { get; set; }
        public int ItemsCount { get; set; }
        public Int64 TotalSize { get; set; }
        public int SingleSizePrice { get; set; }
        public int ItemTotalPrice { get; set; }
    }
}
