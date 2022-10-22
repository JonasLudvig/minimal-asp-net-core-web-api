namespace ASP_NETCoreWebAPI.DAL;

public interface IUnitOfWork
{
    IUserRepository UserRepository { get; }
    IItemRepository ItemRepository { get; }
    void Save();
}