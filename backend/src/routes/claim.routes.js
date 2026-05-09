const { Router } = require("express");
const { createClaim, getUserClaims, getAllClaims, getClaimById, updateClaimStatus, deleteClaim, updateClaim } = require("../controllers/claim.controller");
const { authenticate, authorize } = require("../middlewares/auth");
const { UserRole } = require("../entities/User");

const router = Router();

router.use(authenticate);

router.post("/", createClaim);
router.get("/my-claims", getUserClaims);
router.get("/:id", getClaimById);
router.put("/:id", updateClaim);
router.delete("/:id", deleteClaim);

router.get("/", authorize([UserRole.ADMIN]), getAllClaims);
router.patch("/:id/status", authorize([UserRole.ADMIN]), updateClaimStatus);

module.exports = router;
