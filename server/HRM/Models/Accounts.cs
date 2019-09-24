using System;
using System.Collections.Generic;

namespace HRM.Models
{
    public partial class Accounts
    {
        public Accounts()
        {
            Employees = new HashSet<Employees>();
        }

        public string Userid { get; set; }
        public string Password { get; set; }
        public string Apitoken { get; set; }

        public virtual ICollection<Employees> Employees { get; set; }
    }
}
