﻿// <auto-generated />
using ASP_NETCoreWebAPI.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ASP_NETCoreWebAPI.Migrations
{
    [DbContext(typeof(ModelDbContext))]
    partial class ModelDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("ASP_NETCoreWebAPI.DAL.Models.Item", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("AttributeFirst")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("AttributeForth")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("AttributeSecond")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("AttributeThird")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("ASP_NETCoreWebAPI.DAL.Models.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("AttributeFirst")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("AttributeSecond")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("AttributeThird")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ItemUser", b =>
                {
                    b.Property<int>("ItemsId")
                        .HasColumnType("int");

                    b.Property<string>("UsersId")
                        .HasColumnType("varchar(255)");

                    b.HasKey("ItemsId", "UsersId");

                    b.HasIndex("UsersId");

                    b.ToTable("ItemUser");
                });

            modelBuilder.Entity("ItemUser", b =>
                {
                    b.HasOne("ASP_NETCoreWebAPI.DAL.Models.Item", null)
                        .WithMany()
                        .HasForeignKey("ItemsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ASP_NETCoreWebAPI.DAL.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
