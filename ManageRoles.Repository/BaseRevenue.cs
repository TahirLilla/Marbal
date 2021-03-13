
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbal.Model
{
    public class BaseRevenue
    {
        public readonly MarbalEntities _MarbalContext;
        private bool _disposed = false;

        public BaseRevenue(MarbalEntities entities)
        {
            _MarbalContext = entities;
        }
        protected virtual void Dispose(bool disposing)
        {
            if (!this._disposed)
            {
                if (disposing)
                {
                    _MarbalContext.Dispose();
                }
            }
            this._disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);

            GC.SuppressFinalize(this);
        }

    }
}
