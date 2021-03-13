using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ManageRoles.ViewModels;
using ManageRoles.Repository;

namespace ManageRoles.Controllers
{
    public class OrderController : Controller
    {
        private readonly MessagesVM _MESSAGES;
        private readonly OrderRepository _orderRepository;
        private readonly ProductCategoryRepository _productCategoryRepository;
        private readonly ProductRepository _productRepository;
        private readonly CategoryRepository _categoryRepository;

        public OrderController(MessagesVM messages, OrderRepository orderRepository, ProductRepository productRepository, 
            ProductCategoryRepository productCategoryRepository, CategoryRepository categoryRepository)
        {
            _MESSAGES = messages;
            _orderRepository = orderRepository;
            _productCategoryRepository = productCategoryRepository;
            _productRepository = productRepository;
            _categoryRepository = categoryRepository;
        }
        // GET: Order
        public ActionResult Create()
        {
            try
            {
                OrderCreateVM vm = new OrderCreateVM();
                var products = _productRepository.GetAll();
                List<DDLProductVM> productList = new List<DDLProductVM>();
                AutoMapper.Mapper.Map(products, productList);
                vm.Products = productList;
                var categories = new List<CategoryVM>();
                categories.Add(new CategoryVM { ID = 0, CategoryName = "Select Category" });
                vm.Categories = categories;
                return View(vm);
            }
            catch (Exception ex)
            {
                Response.StatusCode = 400;
                throw ex;
            }
        }

        [HttpPost]
        public ActionResult Create(OrderCreateVM vm)
        {
            try
            {
                vm.Product = _productCategoryRepository.find(vm.ProductID, vm.CategoryID);
                vm.Product = _productCategoryRepository.GetProduct(vm.ProductCatID);
                _orderRepository.save(vm);
                Response.StatusCode = 200;
                return Json(new
                {
                    param1 = vm,
                    param2 = _MESSAGES.SUCCESS
                });
            }
            catch (Exception)
            {
                Response.StatusCode = 400;
                throw;
            }
        }

        public JsonResult OrderDetailShowGrid(int orderID, JQgridParamData param)
        {
            try
            {
                var orderDetail = _orderRepository.GetOrderDetailGrid(orderID);
                var records = orderDetail.Count();
                var PC = (double)records / param.rows;
                var pageCount = (int)Math.Ceiling(PC);
                var sk = (param.page * param.rows) - param.rows;
                var result = orderDetail.Skip(sk).Take(param.rows).ToList();
                List<OrderDetailVM> orderResult = new List<OrderDetailVM>();
                AutoMapper.Mapper.Map(result, orderResult);
                var jsonData = new JQgridJsonParamVM<OrderDetailVM>
                {
                    total = pageCount,
                    page = param.page,
                    records = records,
                    rows = orderResult
                };

                return Json(jsonData, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                Response.StatusCode = 400;
                throw;
            }
        }
    }
}