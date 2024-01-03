const asyncHandlerSync = require("express-async-handler");
const Company = require("../../models/company.models.cjs");
const User = require("../../models/user.models.cjs");

//  @desc       Get Company List
//  @route      Get /api/business/
//  @access     Private
const getCompanies = asyncHandlerSync(async (req, res) => {
  const companies = await Company.find({ owner: req.user.id });
  res.status(200).json(companies);
});

//  @desc       Get Company List
//  @route      Get /api/business/new
//  @access     Private
const createCompany = asyncHandlerSync(async (req, res) => {
  const { name, url, about, phone, email, logo } = req.body;

  if (!name || !url || !about || !phone || !email || !logo) {
    res.status(400);
    throw new Error("Please fill required input fields");
  }

  //  Check if company exists
  const hasCompany = await Company.findOne({ contact: { email } });
  if (hasCompany) {
    res.status(400);
    throw new Error("Company already exists");
  }


  const company = await Company.create({
    owner: req.user.id,
    name,
    url,
    imgUrl: logo,
    contact: { phone: phone, email: email },
    about,
  });
  if (company) {
    res.status(201).json({
      _id: company.id,
      owner: company.owner,
      name: company.name,
      url: company.url,
      logo: company.imgUrl,
      contact: company.contact,
      regDate: company.regDate
    });
    console.log("New company data added!");
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
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
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  if (hasCompany.owner.toString() !== user.id) {
    res.status(401);
    throw new Error("User not found");
  }
  const {name, url, imgUrl, about, phone, email} = req.body
  const updateCompany = await Company.findByIdAndUpdate(
    req.params.id,
    { name, contact: { phone, email }, about, url, imgUrl},
    { new: true }
  );
  if (updateCompany) {
    res.status(201).json({
      _id: updateCompany.id,
      owner: updateCompany.owner,
      name: updateCompany.name,
      url: updateCompany.url,
      logo: updateCompany.imgUrl,
      contact: updateCompany.contact,
      regDate: updateCompany.regDate,
    });
    console.log("Company data updated!");
  } else {
    res.status(400);
    throw new Error("Invalid company data");
  }
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
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  if (company.owner.toString() !== user.id) {
    res.status(401);
    throw new Error("User not found");
  }
  await Company.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `Company(${req.params.id}) data deleted!` });
});

module.exports = { getCompanies, createCompany, updateCompany, deleteCompany };
