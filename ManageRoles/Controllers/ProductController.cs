using ManageRoles.Repository;
using ManageRoles.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ManageRoles.Controllers
{
    public class ProductController : Controller
    {
        private readonly CategoryRepository _categoryRepository;
        private readonly MessagesVM _MESSGES;
        private readonly ProductRepository _productRepository;

        public ProductController(CategoryRepository categoryRepository, MessagesVM messages, ProductRepository productRepository)
        {
            _MESSGES = messages;
            _categoryRepository = categoryRepository;
            _productRepository = productRepository;
        }
        //Product Create
        //[Authorize(Users = "admin")]
        public ActionResult Create()
        {
            try
            {
                ProductCreateVM vm = new ProductCreateVM();
                var categories = _categoryRepository.GetAll();
                List<CategoryVM> categoryList = new List<CategoryVM>();
                AutoMapper.Mapper.Map(categories, categoryList);
                vm.Categories = categoryList;
                ViewBag.Categories = categoryList;
                return View(vm);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        //[Authorize(Users ="admin")]
        [HttpPost]
        public ActionResult Create(ProductCreateVM vm)
        {
            try
            {
                ProductVM product = new ProductVM();
                AutoMapper.Mapper.Map(vm, product);
                _productRepository.save(product);

                Response.StatusCode = 200;
                return Json(new
                {
                    param1 = 0,
                    param2 = _MESSGES.SUCCESS
                });
            }
            catch (Exception ex)
            {
                Response.StatusCode = 400;
                return Json(new
                {
                    param1 = 0,
                    param2 = _MESSGES.ERROR
                });
                throw ex;
            }
        }

        public ActionResult ShowGrid(JQgridParamData param)
        {
            try
            {
                var products = _productRepository.GetProductGrid();
                var records = products.Count();
                var PC = (double)records / param.rows;
                var pageCount = (int)Math.Ceiling(PC);
                var sk = (param.page * param.rows) - param.rows;
                var result = products.Skip(sk).Take(param.rows).ToList();
                List<ProductGridVM> productsResult = new List<ProductGridVM>();
                AutoMapper.Mapper.Map(result, productsResult);
                var jsonData = new JQgridJsonParamVM<ProductGridVM>
                {
                    total = pageCount,
                    page = param.page,
                    records = records,
                    rows = productsResult
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