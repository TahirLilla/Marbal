using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ManageRoles.ViewModels;
using ManageRoles.Repository;

namespace ManageRoles.Controllers
{
    public class ExpenseController : Controller
    {
        private readonly MessagesVM _MESSAGES;
        private readonly ExpenseTypeRepository _expenseTypeRepository;
        private readonly ExpensesRepository _expensesRepository;
        public ExpenseController(MessagesVM messagesVM, ExpenseTypeRepository expenseTypeRepository, ExpensesRepository expensesRepository)
        {
            _MESSAGES = messagesVM;
            _expenseTypeRepository = expenseTypeRepository;
            _expensesRepository = expensesRepository;
        }
        // GET: Expense
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(ExpenseTypeVM vm)
        {
            try
            {
                _expenseTypeRepository.save(vm);
                Response.StatusCode = 200;
                return Json(new
                {
                    param1 = vm.Type,
                    param2 = _MESSAGES.SUCCESS
                });
            }
            catch (Exception ex)
            {
                Response.StatusCode = 404;
                return Json(new
                {
                    param1 = 0,
                    param2 = _MESSAGES.ERROR
                });
                throw ex;
            }
        }

        public ActionResult ExpenseTypeShowGrid(JQgridParamData param)
        {
            try
            {
                var types = _expenseTypeRepository.GetExpenseTypesGrid();
                var records = types.Count();
                var PC = (double)records / param.rows;
                var pageCount = (int)Math.Ceiling(PC);
                var sk = (param.page * param.rows) - param.rows;
                var result = types.Skip(sk).Take(param.rows).ToList();
                List<ExpenseTypeVM> typesResult = new List<ExpenseTypeVM>();
                AutoMapper.Mapper.Map(result, typesResult);
                var jsonData = new JQgridJsonParamVM<ExpenseTypeVM>
                {
                    total = pageCount,
                    page = param.page,
                    records = records,
                    rows = typesResult
                };

                return Json(jsonData, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        public ActionResult Expenses()
        {
            try
            {
                ExpensesVM vm = new ExpensesVM();
                List<ExpenseTypeVM> types = new List<ExpenseTypeVM>();
                var result = _expenseTypeRepository.GetAll();
                AutoMapper.Mapper.Map(result, types);
                vm.Types = types;
                return View(vm);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [HttpPost]
        public ActionResult Expenses(ExpensesVM vm)
        {
            try
            {
                _expensesRepository.save(vm);
                Response.StatusCode = 200;
                return Json(new
                {
                    param1 = vm.Expense,
                    param2 = _MESSAGES.SUCCESS
                });
            }
            catch (Exception ex)
            {
                Response.StatusCode = 404;
                return Json(new
                {
                    param1 = 0,
                    param2 = _MESSAGES.ERROR
                });
                throw ex;
            }
        }

        public ActionResult ExpensesShowGrid(JQgridParamData param)
        {
            try
            {
                var expenses = _expensesRepository.GetExpensesGrid();
                var records = expenses.Count();
                var PC = (double)records / param.rows;
                var pageCount = (int)Math.Ceiling(PC);
                var sk = (param.page * param.rows) - param.rows;
                var result = expenses.Skip(sk).Take(param.rows).ToList();
                List<vw_ExpenseVM> expensesResult = new List<vw_ExpenseVM>();
                AutoMapper.Mapper.Map(result, expensesResult);
                var jsonData = new JQgridJsonParamVM<vw_ExpenseVM>
                {
                    total = pageCount,
                    page = param.page,
                    records = records,
                    rows = expensesResult
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