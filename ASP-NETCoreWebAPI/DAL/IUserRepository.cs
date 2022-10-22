using ASP_NETCoreWebAPI.DAL.Models;

namespace ASP_NETCoreWebAPI.DAL;
public interface IUserRepository
{
    bool UnbindUserItem(int itemId, string userEmail);
    bool BindUserItem(int itemId, string userEmail);
    List<User> GetAllUsers();
    User GetUser(string id);
    void PostUser(User user);
    bool UpdateUser(User user);
    void DeleteUser(string id);
}