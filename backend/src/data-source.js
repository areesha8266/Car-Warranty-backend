const { DataSource } = require("typeorm");
const { User } = require("./entities/User");
const { Product } = require("./entities/Product");
const { Claim } = require("./entities/Claim");
const dotenv = require("dotenv");

dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [User, Product, Claim],
  migrations: [],
  subscribers: []
});

module.exports = { AppDataSource };
