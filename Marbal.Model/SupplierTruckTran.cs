//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Marbal.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class SupplierTruckTran
    {
        public int ID { get; set; }
        public Nullable<int> TruckID { get; set; }
    
        public virtual RecordTruckTbl RecordTruckTbl { get; set; }
        public virtual SupplierTransectionTbl SupplierTransectionTbl { get; set; }
    }
}
