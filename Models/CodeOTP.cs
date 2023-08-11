using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace GenSecurOTP.Models
{
    public class CodeOTP
    {
        [Key]
        public int IDOTP { get; set; }
        public string Code { get; set; }
        public DateTime DateGen { get; set; }
        public DateTime DateExp { get; set; }
        public string Username { get; set; }

        [JsonIgnore]
        public User User { get; set; }
    }
}
