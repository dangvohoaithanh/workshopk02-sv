using System;
using System.Collections.Generic;

namespace HRM.Models
{
    public partial class Workschedules
    {
        public int Id { get; set; }
        public DateTime Begintime { get; set; }
        public DateTime Endtime { get; set; }
        public string Description { get; set; }
        public int Employeeid { get; set; }

        public virtual Employees Employee { get; set; }
    }
}
