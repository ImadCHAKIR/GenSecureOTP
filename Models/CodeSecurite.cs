using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GenSecurOTP.Models
{
    public class CodeSecurite
    {
        [Key]
        public int IDCS { get; set; }
        public string CodeSec { get; set; }
        public DateTime DateGen { get; set; }
        public string Username { get; set; }
        [JsonIgnore]
        public User User { get; set; }
    }
}
