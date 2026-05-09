const { EntitySchema } = require("typeorm");

const Product = new EntitySchema({
  name: "Product",
  tableName: "products",
  columns: {
    id: { primary: true, type: "uuid", generated: "uuid" },
    serialNo: { type: "varchar", unique: true },
    model: { type: "varchar" },
    purchaseDate: { type: "date" },
    warrantyExpiry: { type: "date" },
    userId: { type: "varchar" },
    createdAt: { type: "timestamp", createDate: true },
    updatedAt: { type: "timestamp", updateDate: true }
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "userId" },
      inverseSide: "products"
    },
    claims: {
      type: "one-to-many",
      target: "Claim",
      inverseSide: "product"
    }
  }
});

module.exports = { Product };
