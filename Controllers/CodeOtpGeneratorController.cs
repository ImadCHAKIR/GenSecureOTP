using Microsoft.AspNetCore.Mvc;


using GenSecurOTP.Models;
using Serilog;

using System.Text;
using System.Security.Cryptography;
using GenSecurOTP.Classes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace apitest.Controllers{

    [ApiController]
    [Route("[controller]")]
    [EnableCors("AllowAnyOrigin")]
    public class CodeOtpGeneratorController : ControllerBase
    {
        private readonly GenerateurSecuriteOTPDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public CodeOtpGeneratorController(GenerateurSecuriteOTPDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        [HttpPost("otp")]
        [Authorize]
        public async Task<IActionResult> GetCode([FromBody] OtpRequest request)
        {
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

            return Ok(new { code = codeOTP });
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
