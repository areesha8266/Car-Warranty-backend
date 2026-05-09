const { AppDataSource } = require("../data-source");
const { Product } = require("../entities/Product");
const { UserRole } = require("../entities/User");

const productRepository = AppDataSource.getRepository(Product);

const createProduct = async (req, res) => {
  try {
    const product = productRepository.create({
      ...req.body,
      userId: req.user.id
    });
    await productRepository.save(product);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getUserProducts = async (req, res) => {
  try {
    const products = await productRepository.find({
      where: { userId: req.user.id },
      order: { createdAt: "DESC" }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productRepository.find({ relations: ["user"] });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await productRepository.findOne({
      where: { id: req.params.id },
      relations: ["claims"]
    });

    if (!product) return res.status(404).json({ message: "Vehicle not found" });

    if (req.user.role === UserRole.CUSTOMER && product.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await productRepository.remove(product);
    res.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { createProduct, getUserProducts, getAllProducts, deleteProduct };
