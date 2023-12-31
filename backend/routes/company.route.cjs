const express = require("express");
const router = express.Router();
const {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/company/companyController.cjs");

router.route("/").get(getCompanies);

router.route("/new").post(createCompany);

router.route("/:id/update").put(updateCompany);

router.route("/:id/delete").delete(deleteCompany);

module.exports = router;
