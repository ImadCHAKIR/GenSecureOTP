using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GenSecurOTP.Models;
using Serilog;
using Azure.Core;
using GenSecurOTP;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.Security.Cryptography;
using GenSecurOTP.Classes;
using Microsoft.Data.SqlClient;
using System.Linq;

namespace apitest.Controllers{

    [ApiController]
    [Route("[controller]")]
    [EnableCors("AllowAnyOrigin")]
    public class AuthentificationController : ControllerBase
    {
        private readonly GenerateurSecuriteOTPDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public AuthentificationController(GenerateurSecuriteOTPDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        [HttpPost("authentifier")]
        public async Task<IActionResult> Authentifier([FromBody] AuthentificationRequest request)
        {
            Console. WriteLine("test" + request);
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Les données ne sont pas valides.");
                }

                User utilisateur = await _dbContext.Users.FindAsync(request.Username);

                if (utilisateur == null || utilisateur.MotDePasse != request.MotDePasse)
                {
                    Log.Information($"Authentification échouée pour l'utilisateur {request.Username} à {DateTime.Now}");
                    return Unauthorized();
                }

                string dernierCodeSecurite = await _dbContext.CodesSecurite
                        .Where(c => c.Username == request.Username)
                        .OrderByDescending(c => c.DateGen)
                        .Select(c => c.CodeSec)
                        .FirstOrDefaultAsync();

                if (string.IsNullOrEmpty(dernierCodeSecurite) || dernierCodeSecurite != request.CodeSecurite)
                {
                    Log.Information($"Code de sécurité incorrect pour l'utilisateur {request.Username} à {DateTime.Now}");
                    return Unauthorized();
                }

                Log.Information($"Authentification réussie pour l'utilisateur {request.Username} à {DateTime.Now}");

                int dureeExpirationMinutes = int.Parse(_configuration.GetSection("AppSettings")["DureeExpirationCodeOTP"]);

                int codeOTP = GenererCode();


                DateTime dateGen = DateTime.Now;
                DateTime dateExp = dateGen.AddMinutes(dureeExpirationMinutes);

                CodeOTP nouveauCodeOTP = new CodeOTP
                {
                    Code = codeOTP.ToString(),
                    DateGen = dateGen,
                    DateExp = dateExp,
                    Username = request.Username
                };

                _dbContext.CodesOtp.Add(nouveauCodeOTP);
                await _dbContext.SaveChangesAsync();

                Log.Information($"Code OTP généré pour l'utilisateur {request.Username} : {codeOTP} à {DateTime.Now}. Date d'expiration : {dateExp}");

                return Ok(new { 
                    Message = "Authentification réussie ! Code OTP généré : " + codeOTP,
                    connect = true,
                    code = codeOTP
                });
            }   
            catch (Exception ex)
            {
                Log.Error($"Une erreur s'est produite lors de l'authentification : {ex}");
                return StatusCode(500, "Une erreur s'est produite lors de l'authentification.");
            }
        }

        public static string CalculateSHA512Hash(string input)
        {
            // Convertir la chaîne de caractères en tableau d'octets en utilisant UTF-16 Little Endian
            byte[] inputBytes = Encoding.Unicode.GetBytes(input);

            using (SHA512 sha512 = SHA512.Create())
            {
                byte[] hashBytes = sha512.ComputeHash(inputBytes);

                StringBuilder builder = new StringBuilder();
                foreach (byte b in hashBytes)
                {
                    builder.Append(b.ToString("x2"));
                }

                return builder.ToString();
            }
        }

        private int GenererCode()
        {
            int minCode = int.Parse(_configuration.GetSection("AppSettings")["MinCodeOTP"]);
            int maxCode = int.Parse(_configuration.GetSection("AppSettings")["MaxCodeOTP"]);

            Random random = new Random();
            int codeOTP = random.Next(minCode, maxCode);

            return codeOTP;
        }
    }
}
