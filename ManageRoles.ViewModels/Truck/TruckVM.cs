using Marbal.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageRoles.ViewModels
{
    public class TruckVM
    {
        public int ID { get; set; }
        public string DriverName { get; set; }
        public string DriverNumber { get; set; }
        public string TruckNumber { get; set; }
        public int SupplierID { get; set; }
        public int TruckWeight { get; set; }
        public int PerTonRent { get; set; }
        public int LabourCost { get; set; }
        public int WeightExpense { get; set; }
        public int TotalSqFeet { get; set; }
        public int InAdvancePament { get; set; }
        public DateTime Date { get; set; }
        public decimal TotalAmount { get; set; }
        public int ProductID { get; set; }
        public int CategoryID { get; set; }
        public int Length { get; set; }
        public int Width { get; set; }
        public int Breadth { get; set; }
        public int Count { get; set; }
        public int ProductCatID { get; set; }
        public ProductCategoryTbl Product { get; set; }
        public List<DDLSupplierVM> Suppliers { get; set; }
        public List<DDLProductVM> Products { get; set; }
        public List<CategoryVM> Categories { get; set; }
    }
}
