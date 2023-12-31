const asyncHandlerSync = require("express-async-handler");
const { companyModel } = require("../../models/company.models.cjs");
const Company = companyModel;

//  @desc       Get Company List
//  @route      Get /api/business/
//  @access     Private
const getCompanies = asyncHandlerSync(async (req, res) => {
  const companies = await Company.find();
  res.status(200).json(companies);
});

//  @desc       Get Company List
//  @route      Get /api/business/new
//  @access     Private
const createCompany = asyncHandlerSync(async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const about = req.body.about;

  const newCompany = await Company.create({
    name: name,
    contact: { phone: phone, email: email },
    about: about,
  });
  if (res.status(200)) console.log("New company data added!");
  res.status(200).json(newCompany);
});

//  @desc       Get Company List
//  @route      Get /api/business/:id/update
//  @access     Private
const updateCompany = asyncHandlerSync(async (req, res) => {
  const hasCompany = await Company.findById(req.params.id);
  if (!hasCompany) {
    res.status(400);
    throw new Error("Company not found");
  }
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const about = req.body.about;
  const updateCompany = await Company.findByIdAndUpdate(
    req.params.id,
    { name: name, contact: { phone: phone, email: email }, about: about },
    { new: true }
  );
  if (res.status(200)) console.log("Company data updated!");
  res.status(200).json(updateCompany);
});

//  @desc       Get Company List
//  @route      Get /api/business/:id/delete
//  @access     Private
const deleteCompany = asyncHandlerSync(async (req, res) => {
  const company = await Company.findById(req.params.id);
  if (!company) {
    res.status(400);
    throw new Error("Company not found");
  }
  await Company.findByIdAndDelete(req.params.id)
  res.status(200).json({message: `Company data ${req.params.id} deleted!`})
});

module.exports = { getCompanies, createCompany, updateCompany, deleteCompany };
