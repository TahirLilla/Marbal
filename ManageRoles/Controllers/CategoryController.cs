using ManageRoles.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ManageRoles.Repository;


namespace ManageRoles.Controllers
{
    public class CategoryController : Controller
    {
        private readonly CategoryRepository _categoryRepository;
        private readonly MessagesVM _MESSGES;
        private readonly ProductCategoryRepository _productCategoryRepository;

        public CategoryController(CategoryRepository categoryRepository, MessagesVM messages, ProductCategoryRepository productCategoryRepository)
        {
            _MESSGES = messages;
            _categoryRepository = categoryRepository;
            _productCategoryRepository = productCategoryRepository;
        }


        // Category Create
        //[Authorize(Users ="admin")]
        public ActionResult Create()
        {
            return View();
        }

        //[Authorize(Users ="admin")]
        [HttpPost]
        public ActionResult Create(CategoryVM vm)
        {
            try
            {
                _categoryRepository.save(vm);
                Response.StatusCode = 200;
                return Json(new
                {
                    param1 = vm.CategoryName,
                    param2 = _MESSGES.SUCCESS
                });
            }
            catch (Exception ex)
            {
                Response.StatusCode = 404;
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
                var categories = _categoryRepository.GetCategoryGrid();
                var records = categories.Count();
                var PC = (double)records / param.rows;
                var pageCount = (int)Math.Ceiling(PC);
                var sk = (param.page * param.rows) - param.rows;
                var result = categories.Skip(sk).Take(param.rows).ToList();
                List<CategoryVM> categoriesResult = new List<CategoryVM>();
                AutoMapper.Mapper.Map(result, categoriesResult);
                var jsonData = new JQgridJsonParamVM<CategoryVM>
                {
                    total = pageCount,
                    page = param.page,
                    records = records,
                    rows = categoriesResult
                };

                return Json(jsonData, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public JsonResult DDLCategoriesByProductID(int productID)
        {
            try
            {
                var categories = _productCategoryRepository.GetByProductID(productID);
                List<CategoryVM> categoriesList = new List<CategoryVM>();
                AutoMapper.Mapper.Map(categories, categoriesList);
                return Json(new { data = categoriesList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}