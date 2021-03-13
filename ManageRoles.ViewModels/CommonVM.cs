using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageRoles.ViewModels
{
    public class CommonVM
    {
        private bool _disposed = false;

        public CommonVM()
        {
        }
        protected virtual void Dispose(bool disposing)
        {
            if (!this._disposed)
            {

            }
            this._disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);

            GC.SuppressFinalize(this);
        }

        public List<int> GetPIDSValues(string IDs)
        {
            IDs = IDs.Trim('[', ']');
            string[] string_ids = IDs.Split(',');
            List<int> P_IDs = new List<int>();
            foreach (var item in string_ids)
            {
                int num = 0;
                if (int.TryParse(item, out num))
                    P_IDs.Add(num);
            }

            return P_IDs;
        }

        public long ConvertKMFTOFeets(string AreaKMF, int feet_per_mar)
        {
            if (String.IsNullOrEmpty(AreaKMF))
            {
                return (long)0;
            }
            string[] dta = AreaKMF.Split('-');
            long _area = 0;
            long _converter = 0;
            if (long.TryParse(dta[0], out _converter))
            {
                //if (_converter != 0)
                //{
                    _area = _converter * 20;
                //}
            }
            _converter = 0;

            if (long.TryParse(dta[1], out _converter))
            {
                //if (_converter != 0)
                //{
                    _area = _area + _converter;
                    //todo: 272 needs to be repaceed with area
                    _area = _area * feet_per_mar;
                //}
            }
            _converter = 0;

            if (long.TryParse(dta[2], out _converter))
            {
                //if (_converter != 0)
                //{
                    _area = _area + _converter;
                //}
            }
            return _area;
        }



    }
}
