using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageRoles.ViewModels
{
    public class MessagesVM
    {
        private bool _disposed = false;

        public MessagesVM()
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

        public string InValidModel
        {
            get
            {
                return "Error : Invalid Models";
            }
        }

        public string ERROR = "ERROR : Contact ADMINISTRATOR ";
        public string SUCCESS = "Successfully Completed";

      
        public string FardAlreadyUsed(string fardId, string registeNo)
        {
            return "Error : FardID : " + fardId + " already utalized with Registery No: " + registeNo;
        }


        public string INTQALNUMBERALREADYEXIST(string intiqalNo, string registeNo)
        {
            return "Error : Intiqal Number : " + intiqalNo + " already entered against Registery No: " + registeNo;
        }
        //public string REGISTERYALREADYEXIST(string registeryNo)
        //{
        //    return "Error : Registery No : " + registeryNo + " already exist in system ";
        //}
        public string NOTExIST(string itemname , string itemValue)
        {
            return "Error : "+itemname+" : " + itemValue + " not exist in system . . ";
        }

        public string PERSONALREADYEXIST(string cnic)
        {
            return "Person with " + cnic + "already exist";
        }

        public string ALREADYEXIST(string itemname , string itemValue)
        {
            return "Error : "+ itemname + " : " + itemValue + " already exist  . . ";
        }
        public string PersonAdded = "Person Added Successfully ";
    }
}
