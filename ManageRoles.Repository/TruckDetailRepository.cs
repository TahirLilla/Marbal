using Marbal.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace ManageRoles.Repository
{
    public class TruckDetailRepository : BaseRevenue
    {
        public TruckDetailRepository(MarbalEntities entities) : base(entities)
        {
        }

        public IQueryable<vw_TruckDetailTbl> GetGridByTruckID(int truckID)
        {
            return _MarbalContext.vw_TruckDetailTbl.Where(x => x.TruckID == truckID).OrderBy(x => x.ID);
        }
    }
}
