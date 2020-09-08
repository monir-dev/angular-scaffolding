using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ApiStarter.WebApi.Models;
using Microsoft.AspNet.Identity;

namespace ApiStarter.WebApi.Controllers
{
    public class UserController : ApiController
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        public void GetById()
        {
            string userId = RequestContext.Principal.Identity.GetUserId();


        }
    }
}
