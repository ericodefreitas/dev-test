using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserPasswordToHash : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("a65d9bd7-0c7c-485a-9161-f0972b6137d9"));

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "CreatedAt", "ModifiedAt", "PasswordHash", "Role", "Username" },
                values: new object[] { new Guid("74e83886-d33f-4e57-8883-2bf365566fc5"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "$2a$11$6gGmUMdOT.JkOXt94spIWO2Kw23Lfi0iJrLaECPmMRyXsnQ.MQOYu", "Administrator", "admin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("74e83886-d33f-4e57-8883-2bf365566fc5"));

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "CreatedAt", "ModifiedAt", "PasswordHash", "Role", "Username" },
                values: new object[] { new Guid("a65d9bd7-0c7c-485a-9161-f0972b6137d9"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "admin", "Administrator", "admin" });
        }
    }
}
