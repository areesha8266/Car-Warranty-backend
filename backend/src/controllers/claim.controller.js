const { AppDataSource } = require("../data-source");
const { Claim, ClaimStatus } = require("../entities/Claim");
const { UserRole } = require("../entities/User");

const claimRepository = AppDataSource.getRepository(Claim);

const createClaim = async (req, res) => {
  try {
    const { productId, category, description } = req.body;

    const newClaim = new Claim();
    newClaim.productId = productId;
    newClaim.category = category;
    newClaim.description = description;

    await claimRepository.save(newClaim);
    res.status(201).json(newClaim);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getUserClaims = async (req, res) => {
  try {
    const claims = await claimRepository.find({
      where: { product: { userId: req.user.id } },
      relations: ["product"],
      order: { createdAt: "DESC" }
    });
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
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
