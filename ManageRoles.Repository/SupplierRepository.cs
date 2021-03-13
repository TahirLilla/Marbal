using ManageRoles.ViewModels;
using Marbal.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageRoles.Repository
{
    public class SupplierRepository : BaseRevenue
    {
        public SupplierRepository(MarbalEntities entities) : base(entities)
        {

        }

        public void save(SupplierVM vm)
        {
            SupplierTbl entity = new SupplierTbl();
            entity.Name = vm.Name;
            entity.Number = vm.Number;
            entity.AccountNumber = vm.AccountNumber;
            entity.BankName = vm.BankName;
            _MarbalContext.Entry(entity).State = EntityState.Added;
            _MarbalContext.SaveChanges();
        }

        public IQueryable<SupplierTbl> GetSupplierGrid()
        {
            return _MarbalContext.SupplierTbls.OrderBy(x => x.Name);
        }

        public List<SupplierTbl> GetAll()
        {
            return _MarbalContext.SupplierTbls.ToList();
        }
    }
}
