using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HRM.Models;
using Microsoft.AspNetCore.Mvc;

namespace HRM.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly QLNSContext _context;
        public AccountController(QLNSContext context)
        {
            _context = context;
        }



        // GET: api/accounts
        public IEnumerable<Accounts> Get()
        {
            return _context.Accounts.ToList();
        }

        // GET api/account/5
        [HttpGet("{user}")]
        public Accounts Get(string user)
        {
            return _context.Accounts.FirstOrDefault(x => x.Userid == user);
        }

        // POST api/accounts
        [HttpPost]
        public IActionResult Post([FromBody]Accounts value)
        {
            _context.Accounts.Add(value);
            _context.SaveChanges();
            return StatusCode(201, value);
        }
    }
}
