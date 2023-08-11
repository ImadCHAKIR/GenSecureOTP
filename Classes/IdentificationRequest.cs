using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;
using System.Text;

namespace GenSecurOTP.Classes
{
    public class IdentificationRequest
    {
        [Required(ErrorMessage = "Le champ 'Username' est obligatoire.")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Le champ 'MotDePasse' est obligatoire.")]
        public string MotDePasse { get; set; }

        [Required(ErrorMessage = "Le champ 'GSM' est obligatoire.")]
        [RegularExpression(@"^\+212[0-9]{9}$", ErrorMessage = "Le format du numéro de GSM est invalide. Utilisez le format '+212123456789'.")]
        public string GSM { get; set; }

        [Required(ErrorMessage = "Le champ 'IdF' est obligatoire.")]
        public string IdF { get; set; }

    }
}
