using ManageRoles.Repository;
using ManageRoles.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ManageRoles.Controllers
{
    public class SupplierController : Controller
    {
        private readonly SupplierRepository _supplierRepository;
        private readonly MessagesVM _MESSGES;
        private readonly ProductRepository _productRepository;
        public SupplierController(SupplierRepository supplierRepository, MessagesVM messages, ProductRepository productRepository)
        {
            _supplierRepository = supplierRepository;
            _MESSGES = messages;
            _productRepository = productRepository;
        }
        // GET: Supplier
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(SupplierVM vm)
        {
            try
            {
                _supplierRepository.save(vm);
                Response.StatusCode = 200;
                return Json(new
                {
                    param1 = vm.Name,
                    param2 = _MESSGES.SUCCESS
                });
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public ActionResult ShowGrid(JQgridParamData param)
        {
            try
            {
                var suppliers = _supplierRepository.GetSupplierGrid();
                var records = suppliers.Count();
                var PC = (double)records / param.rows;
                var pageCount = (int)Math.Ceiling(PC);
                var sk = (param.page * param.rows) - param.rows;
                var result = suppliers.Skip(sk).Take(param.rows).ToList();
                List<SupplierVM> suppliersResult = new List<SupplierVM>();
                AutoMapper.Mapper.Map(result, suppliersResult);
                var jsonData = new JQgridJsonParamVM<SupplierVM>
                {
                    total = pageCount,
                    page = param.page,
                    records = records,
                    rows = suppliersResult
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