const express = require("express");
const router = express.Router();
const {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/company/companyController.cjs");
const { protect } = require("../middleware/authMiddleware.cjs");

router.route("/").get(protect, getCompanies);

router.route("/new").post(protect, createCompany);

router.route("/:id/update").put(protect, updateCompany);

router.route("/:id/delete").delete(protect, deleteCompany);

module.exports = router;
