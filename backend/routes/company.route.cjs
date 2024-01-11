const express = require("express");
const router = express.Router();
const {
  getCompany,
  getAllCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/company/companyController.cjs");
const { protect } = require("../middleware/authMiddleware.cjs");

router.route("/").get(protect, getCompany);

router.route("/all").get( getAllCompanies);

router.route("/new").post(protect, createCompany);

router.route("/:id/update").put(protect, updateCompany);

router.route("/:id/delete").delete(protect, deleteCompany);

module.exports = router;
