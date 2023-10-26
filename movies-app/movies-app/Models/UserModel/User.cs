using System.ComponentModel.DataAnnotations;

namespace movies_app.Models.UserModel
{
    public class User
    {
        [Key]
        public string UserUID { get; set; }

        [EmailAddress]
        public string Identifier { get; set; }
    }
}