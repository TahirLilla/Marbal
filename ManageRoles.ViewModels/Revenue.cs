using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageRoles.ViewModels
{
    public class Revenue
    {
        public class ValidateDropdown : ValidationAttribute
        {
            //private int _key;
            //public ValidateDropdown (int key)
            //{
            //    _key = key;
            //}
            protected override ValidationResult IsValid(object value, ValidationContext validationContext)
            {
                if (Convert.ToString(value) == "-1")
                {
                    var message = "Choose *";
                    return new ValidationResult(message);
                }
                if (Convert.ToInt16(value) <= 0)
                {
                    var message = "Choose *";
                    return new ValidationResult(message);
                }
                return ValidationResult.Success;
            }
        }
    }

}
