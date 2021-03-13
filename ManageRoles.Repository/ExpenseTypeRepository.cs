using Marbal.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ManageRoles.ViewModels;
using System.Data.Entity;

namespace ManageRoles.Repository
{
    public class ExpenseTypeRepository : BaseRevenue
    {
        public ExpenseTypeRepository(MarbalEntities entities) : base(entities)
        {
        }

        public List<ExpenseTypeTbl> GetAll()
        {
            return _MarbalContext.ExpenseTypeTbls.ToList();
        }

        public void save(ExpenseTypeVM vm)
        {
            try
            {
                ExpenseTypeTbl entity = new ExpenseTypeTbl();
                entity.Type = vm.Type;
                _MarbalContext.Entry(entity).State = EntityState.Added;
                _MarbalContext.SaveChanges();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public IQueryable<ExpenseTypeTbl> GetExpenseTypesGrid()
        {
            return _MarbalContext.ExpenseTypeTbls.OrderBy(x => x.ID);
        }
    }
}
