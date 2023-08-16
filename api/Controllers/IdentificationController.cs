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
using System.Net.Mail;
using System.Net;

namespace apitest.Controllers{

    [ApiController]
    [Route("[controller]")]
    [EnableCors("AllowAnyOrigin")]
    public class IdentificationController : ControllerBase
    {
        private readonly GenerateurSecuriteOTPDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public IdentificationController(GenerateurSecuriteOTPDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        [HttpPost("identifier")]
        public async Task<IActionResult> Identifier([FromBody] IdentificationRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Les données de la requête ne sont pas valides.");
                }

                User utilisateur = await _dbContext.Users.FindAsync(request.Username);

                if (utilisateur == null || utilisateur.MotDePasse != request.MotDePasse || utilisateur.GSM != request.GSM || utilisateur.IdF != request.IdF)
                {
                    Log.Information($"Identification échouée pour l'utilisateur {request.Username} à {DateTime.Now}");
                    return Unauthorized();
                }

                int codeSecurite = GenererCode();

                DateTime dateGen = DateTime.Now;

                CodeSecurite nouveauCodeSecurite = new CodeSecurite
                {
                    CodeSec = codeSecurite.ToString(),
                    DateGen = dateGen,
                    Username = request.Username
                };

                _dbContext.CodesSecurite.Add(nouveauCodeSecurite);
                await _dbContext.SaveChangesAsync();

                Log.Information($"Code de sécurité généré pour l'utilisateur {request.Username} : {codeSecurite} à {DateTime.Now}");
                
                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("cimad1812@gmail.com", "mqthtedrzmnynosp"),
                    EnableSsl = true,
                };
                    
                smtpClient.Send(
                    "cimad1812@gmail.com", 
                    "cimad1812@gmail.com", 
                    "Code Securité Ancfcc", 
                    "Identification réussie ! Code de sécurité généré : " + codeSecurite
                );

                return Ok(new { 
                    Message = "Identification réussie ! Code de sécurité généré : " + codeSecurite,
                    codeSecurite = codeSecurite
                });
            }
            catch (Exception ex)
            {
                Log.Error($"Une erreur s'est produite lors de l'identification : {ex.Message}");
                return StatusCode(500, "Une erreur s'est produite lors de l'identification.");
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
