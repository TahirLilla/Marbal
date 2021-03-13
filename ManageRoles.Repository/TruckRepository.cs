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
    public class TruckRepository : BaseRevenue
    {
        public TruckRepository(MarbalEntities entities) : base(entities)
        {
        }

        // Truck Create Method
        public void save(TruckVM vm)
        {
            try
            {
                RecordTruckTbl truckEntity = new RecordTruckTbl();
                if(vm.ID == 0)
                {
                    truckEntity.DriverName = vm.DriverName;
                    truckEntity.DrivrNumber = vm.DriverNumber;
                    truckEntity.TruckNumber = vm.TruckNumber;
                    truckEntity.SupplierID = vm.SupplierID;
                    truckEntity.TruckWeight = vm.TruckWeight;
                    truckEntity.PerTonRent = vm.PerTonRent;
                    truckEntity.LabourCost = vm.LabourCost;
                    truckEntity.WeightExpense = vm.WeightExpense;
                    truckEntity.TotalSqFeet = vm.TotalSqFeet;
                    truckEntity.InAdvancePament = vm.InAdvancePament;
                    truckEntity.Date = vm.Date;
                    truckEntity.TotalAmount = vm.TotalAmount;

                    _MarbalContext.Entry(truckEntity).State = EntityState.Added;
                    //_MarbalContext.SaveChanges();
                }
                TruckDetailTbl detailEntity = new TruckDetailTbl();
                detailEntity.TruckID = vm.ID;
                detailEntity.ProductID = vm.ProductCatID;
                detailEntity.Length = vm.Length;
                detailEntity.Width = vm.Width;
                detailEntity.Breadth = vm.Breadth;
                detailEntity.Count = vm.Count;
                _MarbalContext.Entry(detailEntity).State = EntityState.Added;
                _MarbalContext.SaveChanges();
                vm.ID = detailEntity.TruckID;


            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
