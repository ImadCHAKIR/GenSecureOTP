using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;
using System.Text;

namespace GenSecurOTP.Classes
{
    public class AuthentificationRequest
    {
        [Required(ErrorMessage = "Le champ 'Username' est obligatoire.")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Le champ 'MotDePasse' est obligatoire.")]
        public string MotDePasse { get; set; }

        [Required(ErrorMessage = "Le champ 'CodeSecurite' est obligatoire.")]
        public string CodeSecurite { get; set; }

    }
}
