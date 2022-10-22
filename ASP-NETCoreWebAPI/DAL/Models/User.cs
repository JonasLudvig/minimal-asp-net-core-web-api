using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ASP_NETCoreWebAPI.DAL.Models
{
    public record User
    {
        public User(string id,
                    string password,
                    string attributeFirst,
                    string attributeSecond,
                    string attributeThird)
        {
            Id = id;
            Password = password;
            AttributeFirst = attributeFirst;
            AttributeSecond = attributeSecond;
            AttributeThird = attributeThird;
        }

        [Key]
        public string Id { get; set; }
        public string Password { get; set; }
        public string AttributeFirst { get; set; }
        public string AttributeSecond { get; set; }
        public string AttributeThird { get; set; }

        [JsonIgnore]
        public List<Item>? Items { get; set; }
    }
}
