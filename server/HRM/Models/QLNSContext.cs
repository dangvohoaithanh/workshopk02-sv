using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace HRM.Models
{
    public partial class QLNSContext : DbContext
    {
        public QLNSContext()
        {
        }

        public QLNSContext(DbContextOptions<QLNSContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Accounts> Accounts { get; set; }
        public virtual DbSet<Employees> Employees { get; set; }
        public virtual DbSet<Salaries> Salaries { get; set; }
        public virtual DbSet<Workschedules> Workschedules { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseNpgsql("Host=localhost;Database=QLNS;Username=postgres;Password=thanhdvh");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Accounts>(entity =>
            {
                entity.HasKey(e => e.Userid)
                    .HasName("PK_Accounts");

                entity.ToTable("accounts");

                entity.Property(e => e.Userid)
                    .HasColumnName("userid")
                    .ValueGeneratedNever();

                entity.Property(e => e.Apitoken).HasColumnName("apitoken");

                entity.Property(e => e.Password).HasColumnName("password");
            });

            modelBuilder.Entity<Employees>(entity =>
            {
                entity.ToTable("employees");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('\"Employees_id_seq\"'::regclass)");

                entity.Property(e => e.Address).HasColumnName("address");

                entity.Property(e => e.Dateofbirth)
                    .HasColumnName("dateofbirth")
                    .HasColumnType("date");

                entity.Property(e => e.Idcard).HasColumnName("idcard");

                entity.Property(e => e.Isleader).HasColumnName("isleader");

                entity.Property(e => e.Name).HasColumnName("name");

                entity.Property(e => e.Salaryid).HasColumnName("salaryid");

                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.HasOne(d => d.Salary)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.Salaryid);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.Userid);
            });

            modelBuilder.Entity<Salaries>(entity =>
            {
                entity.ToTable("salaries");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('\"Salaries_id_seq\"'::regclass)");

                entity.Property(e => e.Salaryperhour).HasColumnName("salaryperhour");
            });

            modelBuilder.Entity<Workschedules>(entity =>
            {
                entity.ToTable("workschedules");

                entity.HasIndex(e => e.Employeeid)
                    .HasName("IX_WorkSchedules_employeeid");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('\"WorkSchedules_id_seq\"'::regclass)");

                entity.Property(e => e.Begintime).HasColumnName("begintime");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.Employeeid).HasColumnName("employeeid");

                entity.Property(e => e.Endtime).HasColumnName("endtime");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.Workschedules)
                    .HasForeignKey(d => d.Employeeid)
                    .HasConstraintName("FK_WorkSchedules_Employees_employeeid");
            });

            modelBuilder.HasSequence<int>("Employees_id_seq");

            modelBuilder.HasSequence<int>("Salaries_id_seq");

            modelBuilder.HasSequence<int>("WorkSchedules_id_seq");
        }
    }
}
