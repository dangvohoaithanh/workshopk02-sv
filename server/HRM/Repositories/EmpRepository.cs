using HRM.Models;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace HRM.Repositories
{
    public class EmpRepository
    {
        private string connectionString = "Server=localhost;Port=5432;Database=QLNS;username=postgres;Password=thanhdvh; Integrated Security=true;Pooling=true;";
        public bool InsertAccount(EmployeesDTO e)
        {
            try
            {
                string sql1 = "insert into accounts VALUES(@userid, @password)";
                NpgsqlConnection pgcon = new NpgsqlConnection(connectionString);
                pgcon.Open();
                NpgsqlCommand pgcom = new NpgsqlCommand(sql1, pgcon);
                pgcom.CommandType = CommandType.Text;

                pgcom.Parameters.AddWithValue("userid", e.Userid);
                pgcom.Parameters.AddWithValue("password", e.Password);
                NpgsqlDataReader pgreader = pgcom.ExecuteReader();


                return true;

            }
            catch
            {
                return false;
            }

        }

        public List<EmployeesDTO> GetEmployeesDTOs()
        {
            List<EmployeesDTO> listEmployee = new List<EmployeesDTO>();
            try
            {
                string sql1 = "SELECT e.* , acc.password from employees e, accounts acc where e.userid = acc.userid";
                //string sql1 = "select e.*, acc.password from employees e, accounts acc where e.userid = acc.userid and" +
                //    " name like '%T%' and isleader = true and address like '%%' and e.userid like '%%'";

                //string sql1 = "select e.*, acc.password from employees e, accounts acc where e.userid = acc.userid and" +
                //    " name like '%" +e.Name+"%' and isleader =" + e.Isleader + " and address like '%" + e.Address+ "%' and e.userid like '%" + e.Userid+ "%'";
                NpgsqlConnection pgcon = new NpgsqlConnection(connectionString);
                pgcon.Open();

                NpgsqlCommand pgcom = new NpgsqlCommand(sql1, pgcon);
                pgcom.CommandType = CommandType.Text;


                NpgsqlDataReader pgreader = pgcom.ExecuteReader();


                while (pgreader.Read())
                {
                    EmployeesDTO result = new EmployeesDTO();
                    result.Id = pgreader.GetInt32(0);
                    result.Isleader = pgreader.GetBoolean(1);
                    result.Name = pgreader.GetString(2);
                    result.Dateofbirth = pgreader.GetDateTime(3);
                    result.Idcard = pgreader.GetInt32(4);
                    result.Address = pgreader.GetString(5);
                    result.Userid = pgreader.GetString(6);
                    result.Salaryid = pgreader.GetInt32(7);
                    result.Password = pgreader.GetString(8);
                    listEmployee.Add(result);
                }

                return listEmployee;

            }
            catch
            {

            }
            return listEmployee;
        }

        
        public List<EmployeesDTO> searchEmployees(EmployeesDTO e)
        {
            List<EmployeesDTO> listEmployee = new List<EmployeesDTO>();
            try
            {
                string sql1 = "select e.*, acc.password from employees e, accounts acc where e.userid = acc.userid and" +
                    " name ilike @name and isleader = @isleader and address like @address and e.userid like @userid";
                //string sql1 = "select e.*, acc.password from employees e, accounts acc where e.userid = acc.userid and" +
                //    " name like '%T%' and isleader = true and address like '%%' and e.userid like '%%'";

                //string sql1 = "select e.*, acc.password from employees e, accounts acc where e.userid = acc.userid and" +
                //    " name like '%" +e.Name+"%' and isleader =" + e.Isleader + " and address like '%" + e.Address+ "%' and e.userid like '%" + e.Userid+ "%'";
                if (e.flag == 1)
                {
                    sql1 = sql1.Replace(" and isleader = @isleader "," ");
                }
                NpgsqlConnection pgcon = new NpgsqlConnection(connectionString);
                pgcon.Open();
                
                NpgsqlCommand pgcom = new NpgsqlCommand(sql1, pgcon);
                pgcom.CommandType = CommandType.Text;
                

                pgcom.Parameters.AddWithValue("name","%" + e.Name + "%");

                pgcom.Parameters.AddWithValue("isleader", e.Isleader);
                
                pgcom.Parameters.AddWithValue("address", "%" + e.Address + "%");
                
                
                pgcom.Parameters.AddWithValue("userid", "%"+ e.Userid+"%");

                NpgsqlDataReader pgreader = pgcom.ExecuteReader();
                

                while (pgreader.Read())
                {
                    EmployeesDTO result = new EmployeesDTO();
                    result.Id = pgreader.GetInt32(0);
                    result.Name = pgreader.GetString(2);
                    result.Userid = pgreader.GetString(6);
                    result.Password = pgreader.GetString(8);
                    result.Dateofbirth = pgreader.GetDateTime(3);
                    result.Address = pgreader.GetString(5);
                    result.Idcard = pgreader.GetInt32(4);
                    result.Isleader = pgreader.GetBoolean(1);
                    result.Salaryid = pgreader.GetInt32(7);
                    listEmployee.Add(result);
                }

                return listEmployee;

            }
            catch
            {
                
            }
            return listEmployee;

        }

        //public List<EmployeesDTO> searchEmployees1(EmployeesDTO e)
        //{
        //    List<EmployeesDTO> listEmployee = new List<EmployeesDTO>();
        //    try
        //    {
        //        string sql1 = "select e.*, acc.password from employees e, accounts acc where e.userid = acc.userid and" +
        //            " name like @name and address like @address and e.userid like @userid";
        //        //string sql1 = "select e.*, acc.password from employees e, accounts acc where e.userid = acc.userid and" +
        //        //    " name like '%T%' and isleader = true and address like '%%' and e.userid like '%%'";

        //        //string sql1 = "select e.*, acc.password from employees e, accounts acc where e.userid = acc.userid and" +
        //        //    " name like '%" +e.Name+"%' and isleader =" + e.Isleader + " and address like '%" + e.Address+ "%' and e.userid like '%" + e.Userid+ "%'";
        //        NpgsqlConnection pgcon = new NpgsqlConnection(connectionString);
        //        pgcon.Open();

        //        NpgsqlCommand pgcom = new NpgsqlCommand(sql1, pgcon);
        //        var a = e.Isleader;
        //        pgcom.CommandType = CommandType.Text;
        //        pgcom.Parameters.AddWithValue("name", "%" + e.Name + "%");


        //        pgcom.Parameters.AddWithValue("address", "%" + e.Address + "%");


        //        pgcom.Parameters.AddWithValue("userid", "%" + e.Userid + "%");

        //        NpgsqlDataReader pgreader = pgcom.ExecuteReader();


        //        while (pgreader.Read())
        //        {
        //            EmployeesDTO result = new EmployeesDTO();
        //            result.Name = pgreader.GetString(2);
        //            result.Userid = pgreader.GetString(6);
        //            result.Password = pgreader.GetString(8);
        //            result.Dateofbirth = pgreader.GetDateTime(3);
        //            result.Address = pgreader.GetString(5);
        //            result.Idcard = pgreader.GetInt32(4);
        //            result.Isleader = pgreader.GetBoolean(1);
        //            listEmployee.Add(result);
        //        }

        //        return listEmployee;

        //    }
        //    catch
        //    {

        //    }
        //    return listEmployee;

        //}

        public bool InsertEmployee(EmployeesDTO e)
        {
            try
            {
                string sql2 = "INSERT INTO employees (isleader,name,dateofbirth,idcard,address,userid, salaryid) VALUES (@isleader,@name, @dateOfBirth, @idCard, @address, @userId, @salaryId)";
                

                
                NpgsqlConnection pgcon = new NpgsqlConnection(connectionString);
                pgcon.Open();
                NpgsqlCommand pgcom = new NpgsqlCommand(sql2, pgcon);
                pgcom.CommandType = CommandType.Text;
                pgcom.Parameters.AddWithValue("isleader", e.Isleader);
                pgcom.Parameters.AddWithValue("name", e.Name);
                pgcom.Parameters.AddWithValue("dateOfBirth", e.Dateofbirth);
                pgcom.Parameters.AddWithValue("idCard", e.Idcard);
                pgcom.Parameters.AddWithValue("address", e.Address);
                pgcom.Parameters.AddWithValue("userId", e.Userid);
                pgcom.Parameters.AddWithValue("salaryId", e.Salaryid);
                NpgsqlDataReader pgreader = pgcom.ExecuteReader();      

                return true;
            }
            catch 
            {
                return false;
            }

        }
        public bool UpdateAccount(EmployeesDTO e)
        {
            try
            {
                string sql1 = "update accounts Set password = @password where userid = @userid";
                NpgsqlConnection pgcon = new NpgsqlConnection(connectionString);
                pgcon.Open();
                NpgsqlCommand pgcom = new NpgsqlCommand(sql1, pgcon);
                pgcom.CommandType = CommandType.Text;
                pgcom.Parameters.AddWithValue("userid", e.Userid);
                pgcom.Parameters.AddWithValue("password", e.Password);
                NpgsqlDataReader pgreader = pgcom.ExecuteReader();


                return true;

            }
            catch
            {
                return false;
            }

        }

        public bool UpdateEmployee(EmployeesDTO e)
        {
            try
            {
                string sql2 = "update employees set isleader = @isleader ,name = @name ,dateofbirth = @dateOfBirth,idcard = @idCard ,address = @address,salaryid = @salaryId" +
                  " where userid = @userid ";



                NpgsqlConnection pgcon = new NpgsqlConnection(connectionString);
                pgcon.Open();
                NpgsqlCommand pgcom = new NpgsqlCommand(sql2, pgcon);
                pgcom.CommandType = CommandType.Text;
                pgcom.Parameters.AddWithValue("isleader", e.Isleader);
                pgcom.Parameters.AddWithValue("name", e.Name);
                pgcom.Parameters.AddWithValue("dateOfBirth", e.Dateofbirth);
                pgcom.Parameters.AddWithValue("idCard", e.Idcard);
                pgcom.Parameters.AddWithValue("address", e.Address);
                pgcom.Parameters.AddWithValue("userId", e.Userid);
                pgcom.Parameters.AddWithValue("salaryId", e.Salaryid);
                NpgsqlDataReader pgreader = pgcom.ExecuteReader();

                return true;
            }
            catch
            {
                return false;
            }

        }

        public bool deleteEmployee(string userid)
        {
            try
            {
                string sql1 = "delete from employees where userid = @userid;";
                NpgsqlConnection pgcon = new NpgsqlConnection(connectionString);
                pgcon.Open();
                NpgsqlCommand pgcom = new NpgsqlCommand(sql1, pgcon);
                pgcom.CommandType = CommandType.Text;
                pgcom.Parameters.AddWithValue("userid", userid);
                NpgsqlDataReader pgreader = pgcom.ExecuteReader();
                return true;
            }
            catch
            {
                return false;
            }

        }

        public bool deleteAccount(string userid)
        {
            try
            {
                string sql1 = "delete from accounts where userid = @userid;";
                NpgsqlConnection pgcon = new NpgsqlConnection(connectionString);
                pgcon.Open();
                NpgsqlCommand pgcom = new NpgsqlCommand(sql1, pgcon);
                pgcom.CommandType = CommandType.Text;
                pgcom.Parameters.AddWithValue("userid", userid);
                NpgsqlDataReader pgreader = pgcom.ExecuteReader();
                return true;
            }
            catch
            {
                return false;
            }

        }
    }
}

   