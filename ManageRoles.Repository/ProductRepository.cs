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
    public class ProductRepository : BaseRevenue
    {
        public ProductRepository(MarbalEntities entities) : base(entities)
        {
        }

        public void save(ProductVM vm)
        {
            try
            {
                ProductTbl entity = new ProductTbl();
                
                var product = _MarbalContext.ProductTbls.Where(x => x.ProductName == vm.ProductName).FirstOrDefault();
                if(product != null)
                {
                    entity.ID = product.ID;
                    var productCat = _MarbalContext.ProductCategoryTbls.Where(x => x.ProductID == product.ID && x.CategoryID == vm.CategoryID).FirstOrDefault();
                    if(productCat != null)
                    {
                        throw new Exception("Product Already Exists");
                    }
                }
                else
                {
                    entity.ProductName = vm.ProductName;
                    _MarbalContext.Entry(entity).State = EntityState.Added;
                }


                //entity.CategoryTbls.Add(_MarbalContext.CategoryTbls.Find(vm.CategoryID));
                ProductCategoryTbl productCategoryTbl = new ProductCategoryTbl();
                productCategoryTbl.ProductID = entity.ID;
                productCategoryTbl.CategoryID = vm.CategoryID;
                _MarbalContext.Entry(productCategoryTbl).State = EntityState.Added;
                _MarbalContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IQueryable<vw_ProductTbl> GetProductGrid()
        {
            return _MarbalContext.vw_ProductTbl.OrderBy(x => x.ProductCatID);
        }

        public List<ProductTbl> GetAll()
        {
            return _MarbalContext.ProductTbls.ToList();
        }
    }
}
