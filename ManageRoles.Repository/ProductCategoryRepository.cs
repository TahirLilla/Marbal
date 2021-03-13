using Marbal.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageRoles.Repository
{
    public class ProductCategoryRepository : BaseRevenue
    {
        public ProductCategoryRepository(MarbalEntities entities) : base(entities)
        {
        }

        //Find ProductCategory Id By Product ID and Category ID
        public ProductCategoryTbl find(int productID, int categoryID)
        {
            try
            {
                return _MarbalContext.ProductCategoryTbls.Where(x => x.ProductTbl == _MarbalContext.ProductTbls.Where(p => p.ID == productID)
                & x.CategoryTbl == _MarbalContext.CategoryTbls.Where(c=> c.ID == categoryID)).FirstOrDefault();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public ProductCategoryTbl GetProduct(int productCatID)
        {
            return _MarbalContext.ProductCategoryTbls.Where(x => x.ProductCatID == productCatID).FirstOrDefault();
        }

        public List<vw_CategoriesByProduct> GetByProductID(int productID)
        {
            return _MarbalContext.vw_CategoriesByProduct.Where(x => x.ProductID == productID).ToList();
        }
    }
}
