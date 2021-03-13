using Marbal.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using ManageRoles.ViewModels;

namespace ManageRoles.Repository
{
    public class ExpensesRepository : BaseRevenue
    {
        public ExpensesRepository(MarbalEntities entities) : base(entities)
        {
        }

        public void save(ExpensesVM vm)
        {
            ExpenseTbl entity = new ExpenseTbl();
            entity.TypeID = vm.TypeID;
            entity.Expense = vm.Expense;
            _MarbalContext.Entry(entity).State = EntityState.Added;
            _MarbalContext.SaveChanges();
        }

        public IQueryable<vw_ExpensesTbl> GetExpensesGrid()
        {
            return _MarbalContext.vw_ExpensesTbl.OrderBy(x => x.ID);
        }

    }
}
