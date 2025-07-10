using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserRoleToProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("74e83886-d33f-4e57-8883-2bf365566fc5"));

            migrationBuilder.DropColumn(
                name: "Role",
                table: "User");

            migrationBuilder.AddColumn<string>(
                name: "Profile",
                table: "User",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "CreatedAt", "ModifiedAt", "PasswordHash", "Profile", "Username" },
                values: new object[] { new Guid("a1b2c3d4-e5f6-7890-1234-567890abcdef"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "$2a$11$5lKCgo.cvqYJsgdqCiGe5OUzCQv54Ngq4Y6dbG6rg1cqUF2Zy79Sa", "Administrator", "admin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("a1b2c3d4-e5f6-7890-1234-567890abcdef"));

            migrationBuilder.DropColumn(
                name: "Profile",
                table: "User");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "User",
                type: "varchar(50)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "CreatedAt", "ModifiedAt", "PasswordHash", "Role", "Username" },
                values: new object[] { new Guid("74e83886-d33f-4e57-8883-2bf365566fc5"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "$2a$11$6gGmUMdOT.JkOXt94spIWO2Kw23Lfi0iJrLaECPmMRyXsnQ.MQOYu", "Administrator", "admin" });
        }
    }
}
