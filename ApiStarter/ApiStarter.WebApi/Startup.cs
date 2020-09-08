using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using Microsoft.Owin.Security.OAuth;

[assembly: OwinStartup(typeof(ApiStarter.WebApi.Startup))]

namespace ApiStarter.WebApi
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // enable cors 
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            
            ConfigureAuth(app);
        }
    }
}
