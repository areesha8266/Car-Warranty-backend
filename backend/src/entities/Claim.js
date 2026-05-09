const { EntitySchema } = require("typeorm");

const ClaimCategory = {
  ENGINE: "Engine",
  BODY: "Body",
  ELECTRONICS: "Electronics"
};

const ClaimStatus = {
  SUBMITTED: "submitted",
  VERIFIED: "verified",
  IN_PROCESS: "in-process",
  APPROVED: "approved",
  REJECTED: "rejected",
  CLOSED: "closed"
};

const Claim = new EntitySchema({
  name: "Claim",
  tableName: "claims",
  columns: {
    id: { primary: true, type: "uuid", generated: "uuid" },
    category: { type: "varchar" },
    description: { type: "text" },
    status: { type: "varchar", default: ClaimStatus.SUBMITTED },
    productId: { type: "varchar" },
    createdAt: { type: "timestamp", createDate: true },
    updatedAt: { type: "timestamp", updateDate: true }
  },
  relations: {
    product: {
      type: "many-to-one",
      target: "Product",
      joinColumn: { name: "productId" },
      inverseSide: "claims"
    }
  }
});

module.exports = { Claim, ClaimCategory, ClaimStatus };
