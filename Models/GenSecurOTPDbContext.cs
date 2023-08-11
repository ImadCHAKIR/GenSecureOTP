using GenSecurOTP.Models;
using Microsoft.EntityFrameworkCore;

public class GenerateurSecuriteOTPDbContext : DbContext
{
    public GenerateurSecuriteOTPDbContext(DbContextOptions<GenerateurSecuriteOTPDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<CodeOTP> CodesOtp { get; set; }
    public DbSet<CodeSecurite> CodesSecurite { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<User>()
            .HasMany(u => u.CodesOtp)
            .WithOne(c => c.User)
            .HasForeignKey(c => c.Username)
            .OnDelete(DeleteBehavior.Cascade); 

        modelBuilder.Entity<User>()
            .HasMany(u => u.CodesSecurite)
            .WithOne(c => c.User)
            .HasForeignKey(c => c.Username)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
