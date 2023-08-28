const express = require("express");
const {
  addToCart,
  getCartProducts,
  deleteCartProduct,
} = require("../controllers/cartController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();
router.route("/cart/product/add").post(isAuthenticatedUser, addToCart);
router.route("/cart/").get(isAuthenticatedUser, getCartProducts);
router
  .route("/cart/product/:id")
  .delete(isAuthenticatedUser, deleteCartProduct);

module.exports = router;
