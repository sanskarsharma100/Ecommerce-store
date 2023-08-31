const Category = require("../models/categoryModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.body;
  const category = await Category.create({
    name,
  });
  res.status(201).json({
    success: true,
    category,
  });
});

exports.getAllCategories = catchAsyncErrors(async (req, res) => {
  const categoryCount = await Category.countDocuments();
  const categories = await Category.find();
  res.status(200).json({
    success: true,
    categoryCount,
    categories,
  });
});
