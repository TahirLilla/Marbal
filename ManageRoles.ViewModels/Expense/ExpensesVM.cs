using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageRoles.ViewModels
{
    public class ExpensesVM
    {
        public int ID { get; set; }
        public int TypeID { get; set; }
        public List<ExpenseTypeVM> Types { get; set; }
        public int Expense { get; set; }
        public DateTime Date { get; set; }
    }
}
