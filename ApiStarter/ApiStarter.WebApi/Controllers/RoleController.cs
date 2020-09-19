using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Metadata.Edm;
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
    public class RoleController : ApiController
    {
        private readonly ApplicationDbContext _context;

        public RoleController()
        {
            _context = new ApplicationDbContext();
        }

        // GET api/role
        public IEnumerable<RoleDto> Get()
        {
            var roles = _context.Roles.Select(
                r => new RoleDto
                {
                    Id = r.Id,
                    Name = r.Name
                });

            return roles;
        }

        // GET api/role/5
        public RoleDto Get(string id)
        {
            var role = _context.Roles.Find(id);

            if (role == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            return new RoleDto
            {
                Id = role.Id,
                Name = role.Name
            };
        }

        // POST api/role
        public async Task Post([FromBody] RoleDto role)
        {
            try
            {
                var manager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ApplicationDbContext()));

                var applicationRole = new IdentityRole()
                {
                    Name = role.Name
                };

                manager.Create(applicationRole);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            
            
        }

        // PUT api/role/5
        public async Task PutAsync(string id, [FromBody] RoleDto roleDto)
        {
            try
            {
                var role = _context.Roles.Find(id);
                role.Name = roleDto.Name;

                _context.Entry(role).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        // DELETE api/role/5
        public async Task Delete(string id)
        {
            try 
            {
                var role = _context.Roles.Find(id);
                _context.Roles.Remove(role);
                await _context.SaveChangesAsync();
            }
            catch(Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
