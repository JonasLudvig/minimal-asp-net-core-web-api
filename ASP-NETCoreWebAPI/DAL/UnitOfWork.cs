namespace ASP_NETCoreWebAPI.DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ModelDbContext _modelDbContext;

        private IUserRepository? _userRepository;
        public IUserRepository UserRepository => _userRepository ?? (_userRepository = new UserRepository(_modelDbContext));

        private IItemRepository? _itemRepository;
        public IItemRepository ItemRepository => _itemRepository ?? (_itemRepository = new ItemRepository(_modelDbContext));

        public UnitOfWork(ModelDbContext modelDbContext)
        {
            _modelDbContext = modelDbContext;
        }

        public void Save()
        {
            _modelDbContext.SaveChanges();
        }
    }
}