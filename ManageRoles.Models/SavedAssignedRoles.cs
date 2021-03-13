﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageRoles.Models
{
    [Table("SavedAssignedRoles")]
    public class SavedAssignedRoles
    {
        [Key]
        public int AssignedRoleId { get; set; }
        public long? UserId { get; set; }
        public int? RoleId { get; set; }
        public DateTime CreateDate { get; set; } 
        public bool Status { get; set; }
    }
}
