using System;
using System.Collections.Generic;

namespace HRM.Models
{
    public partial class Employees
    {
        public Employees()
        {
            Workschedules = new HashSet<Workschedules>();
        }

        public int Id { get; set; }
        public bool Isleader { get; set; }
        public string Name { get; set; }
        public DateTime Dateofbirth { get; set; }
        public int Idcard { get; set; }
        public string Address { get; set; }
        public string Userid { get; set; }
        public int? Salaryid { get; set; }

        public virtual Salaries Salary { get; set; }
        public virtual Accounts User { get; set; }
        public virtual ICollection<Workschedules> Workschedules { get; set; }
    }
}

namespace HRM.Models
{
    public class EmployeesDTO
    {
        public int? Id { get; set; }
        public bool Isleader { get; set; }
        public string Name { get; set; }
        public DateTime Dateofbirth { get; set; }
        public int Idcard { get; set; }
        public string Address { get; set; }
        public string Userid { get; set; }
        public int? Salaryid { get; set; }
        public string Password { get; set; }
        public int flag { get; set; }
    }
}



