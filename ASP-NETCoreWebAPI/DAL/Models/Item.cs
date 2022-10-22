using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ASP_NETCoreWebAPI.DAL.Models
{
    public record Item
    {
        public Item(
                    string attributeFirst,
                    string attributeSecond,
                    string attributeThird,
                    string attributeForth)
        {
            AttributeFirst = attributeFirst;
            AttributeSecond = attributeSecond;
            AttributeThird = attributeThird;
            AttributeForth = attributeForth;
        }

        [Key]
        public int Id { get; set; }
        public string AttributeFirst { get; set; }
        public string AttributeSecond { get; set; }
        public string AttributeThird { get; set; }
        public string AttributeForth { get; set; }
        [JsonIgnore]
        public List<User>? Users { get; set; }
    }
}
