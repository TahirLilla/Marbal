using Marbal.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageRoles.ViewModels
{
    public class OrderCreateVM
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string MobileNumber { get; set; }
        public string Address { get; set; }
        public DateTime? DeliveryDate { get; set; }
        public DateTime OrderDate { get; set; }

        //######  From here the properties of Order Detail starts ######
        public string Detail { get; set; }
        [Required(ErrorMessage = "ماربل کا انتخاب کریں")]
        public int ProductID { get; set; }
        [Required(ErrorMessage = "ماربل کی قسم کا انتخاب کریں")]
        public int CategoryID { get; set; }
        [Required(ErrorMessage = "لمبایٴ کا اندراج کریں")]
        public int Length { get; set; }
        [Required(ErrorMessage = "چوڑایٴ کا اندراج کریں")]
        public int Width { get; set; }
        public int ProductCatID { get; set; }
        public ProductCategoryTbl Product { get; set; }
        public int ItemsCount { get; set; }
        [Required(ErrorMessage = "مکدار کا اندراج کریں")]
        public Int64 TotalSize { get; set; }
        public int SingleSizePrice { get; set; }
        public int ItemTotalPrice { get; set; }
        public List<DDLProductVM> Products { get; set; }
        public List<CategoryVM> Categories { get; set; }
    }
}
