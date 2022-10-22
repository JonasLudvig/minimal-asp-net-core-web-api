using ASP_NETCoreWebAPI.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace ASP_NETCoreWebAPI.DAL
{
    public class UserRepository : IUserRepository
    {
        private readonly ModelDbContext _dBContext;

        public UserRepository(ModelDbContext dBContextObject)
        {
            _dBContext = dBContextObject;
        }

        public bool UnbindUserItem(int itemId, string userId)
        {
            var result = _dBContext.Users.Include(k => k.Items).FirstOrDefault(c => c.Id == userId);
            if (result is null) return false;
            var resultItem = _dBContext.Items.FirstOrDefault(x => x.Id == itemId);
            if (resultItem is null) return false;
            result.Items?.Remove(resultItem);
            return true;
        }

        public bool BindUserItem(int itemId, string userId)
        {
            var result = _dBContext.Users.Include(k => k.Items).FirstOrDefault(c => c.Id == userId);
            if (result is null) return false;
            var resultItem = _dBContext.Items.FirstOrDefault(x => x.Id == itemId);
            if (resultItem is null) return false;
            result.Items?.Add(resultItem);
            return true;
        }

        public List<User> GetAllUsers()
        {
            return _dBContext.Users.ToList();
        }

        public User GetUser(string id)
        {
            return _dBContext.Users.FirstOrDefault(u => u.Id == id)!;
        }

        public void PostUser(User user)
        {
            _dBContext.Add(user);
        }

        public bool UpdateUser(User user)
        {
            var result = _dBContext.Users.FirstOrDefault(c => c.Id == user.Id);
            if (result is null) return false;
            result.Id = user.Id;
            result.Password = user.Password;
            result.AttributeFirst = user.AttributeFirst;
            result.AttributeSecond = user.AttributeSecond;
            result.AttributeThird = user.AttributeThird;
            _dBContext.Update(result);
            return true;
        }

        public void DeleteUser(string id)
        {
            var userIsStored = false;
            foreach (var dBUser in _dBContext.Users) if (dBUser.Id == id) userIsStored = true;
            
            if (!userIsStored) return;
            var userToDelete = GetUser(id);
            _dBContext.Remove(userToDelete);
        }
    }
}
