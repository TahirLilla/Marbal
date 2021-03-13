using ManageRoles.Models;
using ManageRoles.Repository;
using ManageRoles.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace ManageRoles.Controllers
{
    public class PasswordMasterController : Controller
    {

        private readonly IUserMaster _iUserMaster;
        private readonly IPassword _iPassword;
        public PasswordMasterController(IUserMaster userMaster, IPassword password)
        {
            _iUserMaster = userMaster;
            _iPassword = password;

        }
        // GET: PasswordMaster
        public ActionResult ForgetPassword()
        {
            return View();
        }

        public JsonResult VerifiyUser(UsermasterView usermaster)
        {
            try
            {
                var givenEmail = usermaster.EmailId;
                var autoUsermaster = AutoMapper.Mapper.Map<Usermaster>(usermaster);
                var isUser = _iUserMaster.CheckUsernameExists(usermaster.UserName);
                if (isUser)
                {

                    var user = _iUserMaster.GetUserByUsername(usermaster.UserName);
                    if (user.EmailId == givenEmail)
                    {
                        MailMessage mail = new MailMessage("application.test78691@gmail.com", givenEmail);
                        mail.Subject = "Subject";
                        mail.IsBodyHtml = true;
                        mail.Body = "this is email body";

                        SmtpClient client = new SmtpClient("64.233.166.109");
                        client.DeliveryMethod = SmtpDeliveryMethod.Network;
                        client.UseDefaultCredentials = false;
                        client.Credentials = new NetworkCredential("application.test78691@gmail.com", "lilla34402");
                        client.Port = 587;
                        client.EnableSsl = true;


                        //Add this line to bypass the certificate validation
                        // But do not add these lines in a production code
                        System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate (object s,
                                System.Security.Cryptography.X509Certificates.X509Certificate certificate,
                                System.Security.Cryptography.X509Certificates.X509Chain chain,
                                System.Net.Security.SslPolicyErrors sslPolicyErrors)
                        {
                            return true;
                        };


                        client.Send(mail);

                    }
                    else
                    {
                        ModelState.AddModelError("", "Invalid Email");
                    }
                }
                else
                {
                    ModelState.AddModelError("", "Invalid UserName");
                }


                return null;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}