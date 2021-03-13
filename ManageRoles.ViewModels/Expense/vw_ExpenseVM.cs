using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageRoles.ViewModels
{
    public class vw_ExpenseVM
    {
        public int ID { get; set; }
        public string Type { get; set; }
        public int Expense { get; set; }
        public DateTime Date { get; set; }
    }
}
