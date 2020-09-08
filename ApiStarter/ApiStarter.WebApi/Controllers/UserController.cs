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

        public UserController()
        {
            _context = new ApplicationDbContext();
        }

        [HttpGet]
        [Route("api/user/auth-user")]
        public ApplicationUser GetAuthenticatedUser()
        {
            string userId = RequestContext.Principal.Identity.GetUserId();
            if (userId == null)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }

            return _context.Users.Find(userId);
        }

        // GET api/user
        public IEnumerable<ApplicationUser> Get()
        {
            var users = _context.Users.ToList();

            return users;
        }

        // GET api/user/5
        public ApplicationUser Get(string id)
        {
            return _context.Users.Find(id);
        }

        // POST api/user
        public void Post([FromBody] string value)
        {
        }

        // PUT api/user/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/user/5
        public void Delete(int id)
        {
        }
    }
}
