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
    public class CategoryRepository : BaseRevenue
    {
        public CategoryRepository(MarbalEntities entities) : base(entities)
        {
        }

        public void save(CategoryVM vm)
        {
            try
            {
                CategoryTbl entity = new CategoryTbl();
                entity.CategoryName = vm.CategoryName;
                _MarbalContext.Entry(entity).State = EntityState.Added;
                _MarbalContext.SaveChanges();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public IQueryable<CategoryTbl> GetCategoryGrid()
        {
            return _MarbalContext.CategoryTbls.OrderBy(x => x.ID);
        }

        public List<CategoryTbl> GetAll()
        {
            return _MarbalContext.CategoryTbls.ToList();
        }
    }
}
