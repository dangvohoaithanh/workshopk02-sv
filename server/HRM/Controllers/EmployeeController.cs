using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using HRM.Models;
using HRM.Repositories;
using jsreport.AspNetCore;
using jsreport.Types;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using HRM.Models;

namespace HRM.Controllers
{

    
    [Route("[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class EmployeeController : Controller
    {
        private EmpRepository _empRepo;
        private readonly QLNSContext _dbContext;
        public IJsReportMVCService JsReportMVCService { get; }
        public static object ReportSearch;
        

        public EmployeeController(QLNSContext dbContext, IJsReportMVCService jsReportMVCService)
        {
            _dbContext = dbContext;
            _empRepo = new EmpRepository();
            JsReportMVCService = jsReportMVCService;
        }

        
        //NpgsqlCommand command = new NpgsqlCommand("SELECT e.* , acc.password from employees e, accounts acc where e.userid = acc.userid", conn);


        // GET: api/employee
        [HttpGet]
        
        public ActionResult GetEmployees()
        {
            var emp = _dbContext.Employees.FromSql("select * from employees").ToList();
            return Ok(emp);
        }

        //GET: api/employee/GetAllInfo
        [HttpGet]
        [Route("GetAllInfo")]
        public List<EmployeesDTO> GetEmployeesAllInfo()
        {

            ReportSearch = _empRepo.GetEmployeesDTOs();
            return _empRepo.GetEmployeesDTOs();
        }

       
        [HttpPost]
        [Route("filter")]
        public List<EmployeesDTO> searchEmp([FromBody] EmployeesDTO e)
        {
            ReportSearch = _empRepo.searchEmployees(e);
            return _empRepo.searchEmployees(e);
        }

        [Route("view")]
        public IActionResult Index()
        {
            return View();
        }
        
        //[Route("EmpReport")]
        [MiddlewareFilter(typeof(JsReportPipeline))]
        public IActionResult EmpReport()
        {
            HttpContext.JsReportFeature().Recipe(Recipe.ChromePdf);
            //var a = _empRepo.searchEmployees(e);
            //a.Cast<EmployeesDTO>().ToList();
            //var b = InvoiceModel.Example();
            //Console.WriteLine(a);
            return View(ReportSearch);
        }
        [Route("EmpReport")]
        [MiddlewareFilter(typeof(JsReportPipeline))]
        public IActionResult EmpReportDownload()
        {
            HttpContext.JsReportFeature().Recipe(Recipe.ChromePdf)
                .OnAfterRender((r) => HttpContext.Response.Headers["Content-Disposition"] = "attachment; filename=\"myReport.pdf\"");

            return View("EmpReport", ReportSearch);
        }

        [MiddlewareFilter(typeof(JsReportPipeline))]
        public async Task<IActionResult> EmpReportWithHeader()
        {
            var header = await JsReportMVCService.RenderViewToStringAsync(HttpContext, RouteData, "Header", new { });

            HttpContext.JsReportFeature()
                .Recipe(Recipe.ChromePdf)
                .Configure((r) => r.Template.Chrome = new Chrome
                {
                    HeaderTemplate = header,
                    DisplayHeaderFooter = true,
                    MarginTop = "1cm",
                    MarginLeft = "1cm",
                    MarginBottom = "1cm",
                    MarginRight = "1cm"
                });

            return View("EmpReport", ReportSearch);
        }

        [MiddlewareFilter(typeof(JsReportPipeline))]
        public IActionResult Items()
        {
            HttpContext.JsReportFeature()
                .Recipe(Recipe.HtmlToXlsx)
                .Configure((r) => r.Template.HtmlToXlsx = new HtmlToXlsx() { HtmlEngine = "chrome" });

            return View(ReportSearch);
        }

        [MiddlewareFilter(typeof(JsReportPipeline))]
        public IActionResult ItemsExcelOnline()
        {
            HttpContext.JsReportFeature()
                .Configure(req => req.Options.Preview = true)
                .Recipe(Recipe.HtmlToXlsx)
                .Configure((r) => r.Template.HtmlToXlsx = new HtmlToXlsx() { HtmlEngine = "chrome" });

            return View("EmpReport", ReportSearch);
        }

        [Route("EmpReportDebugLogs")]
        [MiddlewareFilter(typeof(JsReportPipeline))]
        public IActionResult EmpReportDebugLogs()
        {
            HttpContext.JsReportFeature()
                .DebugLogsToResponse()
                .Recipe(Recipe.ChromePdf);

            return View("EmpReport", ReportSearch);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Employees>> GetEmployeeById(string id)
        {
            string sql = "SELECT e.* , acc.password from employees e, accounts acc where e.userid = acc.userid and id =" + id;
            var emp = _dbContext.Employees.FromSql(sql).Select(e =>
                       new EmployeesDTO()
                       {
                           Id = e.Id,
                           Isleader = e.Isleader,
                           Name = e.Name,
                           Dateofbirth = e.Dateofbirth,
                           Idcard = e.Idcard,
                           Address = e.Address,
                           Userid = e.Userid,
                           Password = e.User.Password,
                           Salaryid = e.Salaryid
                       });

            return Ok(emp);
        }



        

        // POST api/employees
        [HttpPost]
        public ActionResult<Employees> Post([FromBody] EmployeesDTO e)
        {

            try
            {
                if (_empRepo.InsertAccount(e))
                {
                    if (_empRepo.InsertEmployee(e))
                        return Ok();
                }
            }
            catch (Exception excep)
            {
                return NotFound(excep);
            }

            return NotFound();
        }

        [HttpPost]
        [Route("update")]
        public ActionResult<Employees> Update([FromBody] EmployeesDTO e)
        {

            try
            {
                if (_empRepo.UpdateAccount(e))
                {
                    if (_empRepo.UpdateEmployee(e))
                        return Ok();
                }
            }
            catch (Exception excep)
            {
                return NotFound(excep);
            }
            
            return NotFound();
        }

        [HttpDelete("{userid}")]
        public ActionResult DelEmployee(string userid)
        {
            try
            {
                if (_empRepo.deleteEmployee(userid))
                {
                    if (_empRepo.deleteAccount(userid))
                        return Ok();
                }
            }
            catch (Exception excep)
            {
                return NotFound(excep);
            }
            return NotFound();
        }

    }

    
       
   
}
