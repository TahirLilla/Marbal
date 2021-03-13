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
    
    public partial class OrderBookDetailTbl
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public OrderBookDetailTbl()
        {
            this.GatePassDetailTbls = new HashSet<GatePassDetailTbl>();
        }
    
        public int ID { get; set; }
        public string Detail { get; set; }
        public int Length { get; set; }
        public int Width { get; set; }
        public Nullable<int> ItemsCount { get; set; }
        public Nullable<long> TotalSize { get; set; }
        public Nullable<int> SingleSizePrice { get; set; }
        public Nullable<int> ItemTotalPrice { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<GatePassDetailTbl> GatePassDetailTbls { get; set; }
        public virtual OrderBookTbl OrderBookTbl { get; set; }
        public virtual ProductCategoryTbl ProductCategoryTbl { get; set; }
    }
}
