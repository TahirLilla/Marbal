using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Marbal.Model;
using ManageRoles.ViewModels;

namespace ManageRoles.Repository
{
    public class OrderRepository : BaseRevenue
    {
        public OrderRepository(MarbalEntities entities) : base(entities)
        {
        }

        public void save(OrderCreateVM vm)
        {
            try
            {
                OrderBookTbl order = new OrderBookTbl();
                if(vm.ID == 0)
                {
                    order.Name = vm.Name;
                    order.MobileNumber = vm.MobileNumber;
                    order.Address = vm.Address;
                    order.DeliveryDate = vm.DeliveryDate;
                    order.OrderDate = vm.OrderDate;

                    _MarbalContext.Entry(order).State = EntityState.Added;
                    //_MarbalContext.SaveChanges();
                }

                OrderBookDetailTbl orderDetail = new OrderBookDetailTbl();
                orderDetail.OrderBookTbl = order;
                orderDetail.Detail = vm.Detail;
                orderDetail.ProductCategoryTbl = vm.Product;
                orderDetail.Length = vm.Length;
                orderDetail.Width = vm.Width;
                orderDetail.ItemsCount = vm.ItemsCount;
                orderDetail.TotalSize = vm.Length * vm.Width;
                orderDetail.SingleSizePrice = vm.SingleSizePrice;
                orderDetail.ItemTotalPrice = vm.ItemsCount * vm.SingleSizePrice;
                _MarbalContext.Entry(orderDetail).State = EntityState.Added;
                _MarbalContext.SaveChanges();
                vm.ID = order.ID;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IQueryable<OrderBookDetailTbl> GetOrderDetailGrid(int orderID)
        {
            return _MarbalContext.OrderBookDetailTbls.Where(x => x.OrderBookTbl.ID == orderID).OrderBy(x => x.ID);
        }

    }
}
