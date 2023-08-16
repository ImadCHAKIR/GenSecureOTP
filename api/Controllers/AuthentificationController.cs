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
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

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

        [AllowAnonymous]
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

                return Ok(new { 
                    user = request.Username,
                    connect = true
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

        private string GenerateJSONWebToken(AuthentificationRequest request){
            
                var issuer = _configuration["Jwt:Issuer"];
                var audience = _configuration["Jwt:Audience"];
                var key = Encoding.ASCII.GetBytes
                (_configuration["Jwt:Key"]);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                        new Claim("Id", Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Sub, request.Username),
                        new Claim(JwtRegisteredClaimNames.Email, request.MotDePasse),
                        new Claim(JwtRegisteredClaimNames.Jti,
                        Guid.NewGuid().ToString())
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(5),
                    Issuer = issuer,
                    Audience = audience,
                    SigningCredentials = new SigningCredentials
                    (new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha512Signature)
                };
                
                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var jwtToken = tokenHandler.WriteToken(token);
                var stringToken = tokenHandler.WriteToken(token);

                return stringToken;
        }
    }
}
