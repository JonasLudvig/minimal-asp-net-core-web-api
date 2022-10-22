using ASP_NETCoreWebAPI.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace ASP_NETCoreWebAPI.DAL
{
    public class ItemRepository : IItemRepository
    {
        private readonly ModelDbContext _dBContext;

        public ItemRepository(ModelDbContext dBContextObject)
        {
            _dBContext = dBContextObject;
        }

        public bool PostItem(Item item)
        {
            _dBContext.Items.Add(item);
            return true;
        }

        public bool DeleteItem(int id)
        {
            var item = _dBContext.Items.Find(id);
            if (item != null) _dBContext.Items.Remove(item);
            return true;
        }

        public bool UpdateItem(Item item)
        {
            var result = _dBContext.Items.FirstOrDefault(c => c.Id == item.Id);
            if (result is null) return false;
            
            result.AttributeFirst = item.AttributeFirst;
            result.AttributeSecond = item.AttributeSecond;
            result.AttributeThird = item.AttributeThird;
            result.AttributeForth = item.AttributeForth;
            _dBContext.Items.Update(result);
            return true;
        }

        public List<Item> GetAllItems()
        {
            return _dBContext.Items.ToList();
        }

        public Item GetItem(int id)
        {
            return _dBContext.Items.FirstOrDefault(u => u.Id == id)!;
        }

        public List<Item> GetUserItems(string id)
        {
            var user = _dBContext.Users.Include(k => k.Items).FirstOrDefault(u => u.Id == id);
            return user.Items.ToList();
        }
    }
}
