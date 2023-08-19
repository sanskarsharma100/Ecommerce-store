const express = require("express");
const {
  createCategory,
  getAllCategories,
} = require("../controllers/categoryController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router
  .route("/admin/category/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createCategory);

router.route("/categories").get(getAllCategories);

module.exports = router;
