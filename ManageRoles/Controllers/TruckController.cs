using ManageRoles.Repository;
using ManageRoles.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ManageRoles.Controllers
{
    public class TruckController : Controller
    {
        private readonly ProductRepository _productRepository;
        private readonly TruckRepository _truckRepository;
        private readonly SupplierRepository _supplierRepository;
        private readonly MessagesVM _MESSGES;
        private readonly CategoryRepository _categoryRepository;
        private readonly ProductCategoryRepository _productCategoryRepository;
        private readonly TruckDetailRepository _truckDetailRepository;
        public TruckController(ProductRepository productRepository, TruckRepository truckRepository, SupplierRepository supplierRepository,
            MessagesVM messagesVM, CategoryRepository categoryRepository, ProductCategoryRepository productCategoryRepository,
            TruckDetailRepository truckDetailRepository)
        {
            _productRepository = productRepository;
            _truckRepository = truckRepository;
            _supplierRepository = supplierRepository;
            _MESSGES = messagesVM;
            _categoryRepository = categoryRepository;
            _productCategoryRepository = productCategoryRepository;
            _truckDetailRepository = truckDetailRepository;
        }
        // GET: Truck
        public ActionResult Create()
        {
            TruckVM vm = new TruckVM();
            var products = _productRepository.GetAll();
            List<DDLProductVM> productslist = new List<DDLProductVM>();
            AutoMapper.Mapper.Map(products, productslist);
            vm.Products = productslist;
            var categories = new List<CategoryVM>();
            categories.Add(new CategoryVM { ID = 0, CategoryName = "Select Category" });
            vm.Categories = categories;
            //var categories = _categoryRepository.GetAll();
            //List<CategoryVM> categoriesList = new List<CategoryVM>();
            //AutoMapper.Mapper.Map(categories, categoriesList);
            //vm.Categories = categoriesList;
            var suppliers = _supplierRepository.GetAll();
            List<DDLSupplierVM> suppliersList = new List<DDLSupplierVM>();
            AutoMapper.Mapper.Map(suppliers, suppliersList);
            vm.Suppliers = suppliersList;

            return View(vm);
        }
        [HttpPost]
        public ActionResult AddDetail(TruckVM vm)
        {
            try
            {
                //After saving
                vm.Product = _productCategoryRepository.find(vm.ProductID, vm.CategoryID);
                _truckRepository.save(vm);
                //vm.ID = 10; //Returning ID for the first time

                Response.StatusCode = 200;
                return Json(new
                {
                    param1 = vm,
                    param2 = _MESSGES.SUCCESS
                });
                //return RedirectToAction("Create");
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        

        public JsonResult ShowGrid(int truckID, JQgridParamData param)
        {
            try
            {
                var truckDetails = _truckDetailRepository.GetGridByTruckID(truckID);
                var records = truckDetails.Count();
                var PC = (double)records / param.rows;
                var pageCount = (int)Math.Ceiling(PC);
                var sk = (param.page * param.rows) - param.rows;
                var result = truckDetails.Skip(sk).Take(param.rows).ToList();
                List<TruckDetailVM> truckResult = new List<TruckDetailVM>();
                AutoMapper.Mapper.Map(result, truckResult);
                var jsonData = new JQgridJsonParamVM<TruckDetailVM>
                {
                    total = pageCount,
                    page = param.page,
                    records = records,
                    rows = truckResult
                };

                return Json(jsonData, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}