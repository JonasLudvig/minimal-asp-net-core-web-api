using ASP_NETCoreWebAPI.DAL;
using ASP_NETCoreWebAPI.DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Adding services to the container/**/
builder.Services.AddRazorPages();

builder.Services.AddDbContext<ModelDbContext>(options =>
{
    options.UseMySQL();
});

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

var app = builder.Build();

// Configure the HTTP request pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

// Returns all items
app.MapGet("/items", ([FromServices] IUnitOfWork store) =>
{
    var items = store.ItemRepository.GetAllItems();

    return items.Count <= 0 ? Results.NotFound() : Results.Ok(items);
});

// Returns items bound to user
app.MapGet("/user-items/{userEmail}", ([FromServices] IUnitOfWork store, string userEmail) =>
{
    store.ItemRepository.GetUserItems(userEmail);
    return Results.Ok(store.ItemRepository.GetUserItems(userEmail));
});

// Binds item on user
app.MapPut("/bind-user-item/{itemId}", ([FromServices] IUnitOfWork store, int itemId, [FromBody] string userEmail) =>
{
    store.UserRepository.BindUserItem(itemId, userEmail);
    store.Save();
    return Results.Ok();
});
 // Unbinds item on user
app.MapPut("/unbind-user-item/{itemId}", ([FromServices] IUnitOfWork store, int itemId, [FromBody] string userId) =>
{
    store.UserRepository.UnbindUserItem(itemId, userId);
    store.Save();
    return Results.Ok();
});

// Posts course
app.MapPost("/post-item", ([FromServices] IUnitOfWork store, [FromBody] Item item) =>
{
    store.ItemRepository.PostItem(item);
    store.Save();
    return Results.Ok();
});

// Removes item
app.MapDelete("/delete-item/{id}", ([FromServices] IUnitOfWork store, int id) =>
{
    store.ItemRepository.DeleteItem(id);
    store.Save();
    return Results.Ok();
});

//Updates item
app.MapPut("/update-item", ([FromServices] IUnitOfWork store, [FromBody] Item item) =>
{
    store.ItemRepository.UpdateItem(item);
    store.Save();
    return Results.Ok();
});

// Returns all users
app.MapGet("/users", ([FromServices] IUnitOfWork store) => store.UserRepository.GetAllUsers().Count <= 0 ? Results.NotFound() : Results.Ok(store.UserRepository.GetAllUsers()));

// Return user per user ID
app.MapGet("/user/{id}", ([FromServices] IUnitOfWork store, string id) => Results.Ok(store.UserRepository.GetUser(id)));

// Return item per ID
app.MapGet("/item/{id}", ([FromServices] IUnitOfWork store, int id) =>
{
    var item = store.ItemRepository.GetItem(id);
    return Results.Ok(item);
});

// Posts user
app.MapPost("/post-user", ([FromServices] IUnitOfWork store, [FromBody] User user) =>
{
    store.UserRepository.PostUser(user);
    store.Save();
    return Results.Ok();
});

// Updates user
app.MapPut("/update-user", ([FromServices] IUnitOfWork store, [FromBody] User user) =>
{
    store.UserRepository.UpdateUser(user);
    store.Save();
    return Results.Ok();
});

// Deletes user
app.MapDelete("/delete-user/{id}", ([FromServices] IUnitOfWork store, string id) =>
{
    store.UserRepository.DeleteUser(id);
    store.Save();
    return Results.Ok();
});

// Usings
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.MapRazorPages();
app.Run();