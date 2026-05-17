const { AppDataSource } = require("../data-source");
const { Claim, ClaimStatus } = require("../entities/Claim");
const { Product } = require("../entities/Product");
const { UserRole } = require("../entities/User");

const claimRepository = AppDataSource.getRepository(Claim);
const productRepository = AppDataSource.getRepository(Product);

const createClaim = async (req, res) => {
  try {
    const { productId, category, description } = req.body;

    if (!productId || !category || !description?.trim()) {
      return res.status(400).json({ message: "productId, category, and description are required" });
    }

    const product = await productRepository.findOne({
      where: { id: productId, userId: req.user.id },
    });

    if (!product) {
      return res.status(404).json({ message: "Vehicle not found for this account" });
    }

    const newClaim = claimRepository.create({
      productId,
      category,
      description: description.trim(),
      status: ClaimStatus.SUBMITTED,
    });

    const saved = await claimRepository.save(newClaim);
    const claimWithProduct = await claimRepository.findOne({
      where: { id: saved.id },
      relations: ["product"],
    });

    res.status(201).json(claimWithProduct);
  } catch (error) {
    console.error("Error creating claim:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserClaims = async (req, res) => {
  try {
    const claims = await claimRepository
      .createQueryBuilder("claim")
      .innerJoinAndSelect("claim.product", "product")
      .where("product.userId = :userId", { userId: req.user.id })
      .orderBy("claim.createdAt", "DESC")
      .getMany();

    res.json(claims);
  } catch (error) {
    console.error("Error fetching user claims:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllClaims = async (req, res) => {
  try {
    const { serialNo, status, page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    let queryBuilder = claimRepository.createQueryBuilder("claim")
      .leftJoinAndSelect("claim.product", "product")
      .leftJoinAndSelect("product.user", "user")
      .orderBy("claim.createdAt", "DESC")
      .skip(skip)
      .take(Number(limit));

    if (serialNo) {
      queryBuilder = queryBuilder.andWhere("product.serialNo LIKE :serialNo", { serialNo: `%${serialNo}%` });
    }
    if (status) {
      queryBuilder = queryBuilder.andWhere("claim.status = :status", { status });
    }

    const [claims, total] = await queryBuilder.getManyAndCount();

    res.json({
      data: claims,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getClaimById = async (req, res) => {
  try {
    const claim = await claimRepository.findOne({
      where: { id: req.params.id },
      relations: ["product", "product.user"]
    });

    if (!claim) return res.status(404).json({ message: "Claim not found" });

    if (req.user.role === UserRole.CUSTOMER && claim.product.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.json(claim);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateClaimStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!Object.values(ClaimStatus).includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const claim = await claimRepository.findOneBy({ id: req.params.id });
    if (!claim) return res.status(404).json({ message: "Claim not found" });

    claim.status = status;
    await claimRepository.save(claim);

    res.json(claim);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateClaim = async (req, res) => {
  try {
    const claim = await claimRepository.findOne({
      where: { id: req.params.id },
      relations: ["product"]
    });

    if (!claim) return res.status(404).json({ message: "Claim not found" });

    if (req.user.role === UserRole.CUSTOMER && claim.product.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (req.body.description) claim.description = req.body.description;
    if (req.body.category) claim.category = req.body.category;

    await claimRepository.save(claim);
    res.json(claim);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteClaim = async (req, res) => {
  try {
    const claim = await claimRepository.findOne({
      where: { id: req.params.id },
      relations: ["product"]
    });

    if (!claim) return res.status(404).json({ message: "Claim not found" });

    if (req.user.role === UserRole.CUSTOMER && claim.product.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await claimRepository.remove(claim);
    res.json({ message: "Claim deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { createClaim, getUserClaims, getAllClaims, getClaimById, updateClaimStatus, updateClaim, deleteClaim };
