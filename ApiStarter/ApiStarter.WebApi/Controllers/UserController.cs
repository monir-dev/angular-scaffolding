using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using ApiStarter.WebApi.Dtos;
using ApiStarter.WebApi.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security.DataProtection;

namespace ApiStarter.WebApi.Controllers
{
    [Authorize]
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
        public IEnumerable<UserDto> Get()
        {
            var users = _context.Users
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Email = u.Email,
                    UserName = u.UserName,
                    PhoneNumber = u.PhoneNumber,
                    Password = u.PasswordHash
                })
                .ToList();

            return users;
        }

        // GET api/user/5
        public UserDto Get(string id)
        {
            var user = _context.Users.Find(id);

            if (user == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            return  new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Password = user.PasswordHash,
                PhoneNumber = user.PhoneNumber,
                UserName = user.UserName
            };
        }

        // POST api/user
        public void Post([FromBody] UserDto userDto)
        {
            //https://bitoftech.net/2015/01/21/asp-net-identity-2-with-asp-net-web-api-2-accounts-management/

            try
            {
                //Create Identity User

                var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));

                var applicationUser = new ApplicationUser()
                {
                    UserName = userDto.UserName,
                    Email = userDto.Email,
                    EmailConfirmed = true,
                    PhoneNumber = userDto.PhoneNumber
                };

                manager.Create(applicationUser, userDto.Password);


                // Get Newly Created User
                //var user = manager.FindByEmail(userDto.Email);

                //return new UserDto
                //{
                //    Id = user.Id,
                //    Email = user.Email,
                //    Password = user.PasswordHash,
                //    PhoneNumber = user.PhoneNumber,
                //    UserName = user.UserName
                //};
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            
            
        }

        // PUT api/user/5
        public async Task PutAsync(string id, [FromBody] UserDto userDto)
        {
            try
            {
                var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));

                // change Password
                if (!string.IsNullOrEmpty(userDto.Password))
                {
                    var provider = new DpapiDataProtectionProvider("SampleAppName");
                    userManager.UserTokenProvider = new DataProtectorTokenProvider<ApplicationUser>(
                        provider.Create("SampleTokenName"));

                    var token = await userManager.GeneratePasswordResetTokenAsync(id);
                    await userManager.ResetPasswordAsync(id, token, userDto.Password);
                }

                // Update user informations
                var user = await userManager.FindByIdAsync(id);
                user.PhoneNumber = userDto.PhoneNumber;
                user.Email = userDto.Email;
                user.UserName = userDto.Email;
                await userManager.UpdateAsync(user);


                //return new UserDto
                //{
                //    Id = user.Id,
                //    Email = user.Email,
                //    Password = user.PasswordHash,
                //    PhoneNumber = user.PhoneNumber,
                //    UserName = user.UserName
                //};
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        // DELETE api/user/5
        public async Task Delete(string id)
        {
            try 
            {
                var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));

                var user = await userManager.FindByIdAsync(id);
                if (user == null) throw new Exception("User does not found.");

                await userManager.DeleteAsync(user);
            }
            catch(Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
