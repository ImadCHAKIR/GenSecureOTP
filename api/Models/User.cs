using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GenSecurOTP.Models
{
    public class User
    {
        [Key]
        public string Username { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string GSM { get; set; }
        public string IdF { get; set; }
        public string MotDePasse { get; set; }
        
        [JsonIgnore]
        public List<CodeOTP> CodesOtp { get; set; }
        public List<CodeSecurite> CodesSecurite { get; set; }
    }
}
