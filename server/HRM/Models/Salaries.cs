using System;
using System.Collections.Generic;

namespace HRM.Models
{
    public partial class Salaries
    {
        public Salaries()
        {
            Employees = new HashSet<Employees>();
        }

        public int Id { get; set; }
        public int Salaryperhour { get; set; }

        public virtual ICollection<Employees> Employees { get; set; }
    }
}
