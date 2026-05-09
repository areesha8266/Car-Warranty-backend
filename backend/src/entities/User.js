const { EntitySchema } = require("typeorm");

const UserRole = {
  CUSTOMER: "customer",
  ADMIN: "admin"
};

const User = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: { primary: true, type: "uuid", generated: "uuid" },
    email: { type: "varchar", unique: true },
    password: { type: "varchar" },
    role: { type: "varchar", default: UserRole.CUSTOMER },
    createdAt: { type: "timestamp", createDate: true },
    updatedAt: { type: "timestamp", updateDate: true }
  },
  relations: {
    products: {
      type: "one-to-many",
      target: "Product",
      inverseSide: "user"
    }
  }
});

module.exports = { User, UserRole };
