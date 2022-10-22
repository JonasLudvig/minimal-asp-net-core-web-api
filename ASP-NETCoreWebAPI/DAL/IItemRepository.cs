using ASP_NETCoreWebAPI.DAL.Models;

namespace ASP_NETCoreWebAPI.DAL
{
    public interface IItemRepository
    {
        bool PostItem(Item item);
        bool DeleteItem(int id);
        bool UpdateItem(Item item);
        Item GetItem(int id);
        List<Item> GetUserItems(string email);
        public List<Item> GetAllItems();
    }
}