using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageRoles.ViewModels
{
    public class JQgridJsonParamVM<T>
    {
        /// <summary>
        /// total number of Pages
        /// </summary>
        public int total { get; set; }

        /// <summary>
        /// Current page number
        /// </summary>
        public int page { get; set; }
        /// <summary>
        /// Total count of record
        /// </summary>
        public int records { get; set; }
        /// <summary>
        /// Data in list
        /// </summary>
        public List<T> rows { get; set; }
        //total = 1,
        //            page = page,
        //            records = personDetail.Count,
        //            rows = personDetail
    }

    public class JQgridJsonParamVMTEST<T>
    {
        private List<T> _data;
        private int _pageSize;
        private int _pageIndex;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="data">tota filled data from entity framwork</param>
        /// <param name="pageSize">row of jqgrid is eqal to jqgrid selected shown rows.</param>
        /// <param name="pageIndex">this is equal to page of jqgrid</param>
        public JQgridJsonParamVMTEST(List<T> data, int pageSize, int pageIndex)
        {
            this.rows = data;
            this._pageIndex = pageIndex;
            this._pageSize = pageSize;
            this.page = (int)Math.Ceiling((float)total / (float)pageSize);
        }
        /// <summary>
        /// total number of Pages
        /// </summary>
        public int total { get { return _data.Count; } }

        /// <summary>
        /// Current page number
        /// </summary>
        public int page { get; set; }
        /// <summary>
        /// Total count of record
        /// </summary>
        public int records { get; set; }
        /// <summary>
        /// Data in list
        /// </summary>
        public List<T> rows
        {
            get
            {
                return _data.Skip((this._pageIndex - 1) * this._pageSize).Take(this._pageSize).ToList();
            }

            set
            {
                _data = value;
            }
        }
        //total = 1,
        //            page = page,
        //            records = personDetail.Count,
        //            rows = personDetail
    }
}
