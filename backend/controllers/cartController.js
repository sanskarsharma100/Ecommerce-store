const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

exports.addToCart = catchAsyncErrors(async (req, res, next) => {
  const productId = req.body.productId;
  let quantity = req.body.quantity;
  const product = await Product.findById(productId);
  const userId = req.user._id;
  let cart = await Cart.findOne({ user: userId });
  if (quantity > product.stock) {
    quantity = product.stock;
  }
  const totalPrice = quantity * product.price;

  //Check if cart is created or not for the current user
  if (cart) {
    //Check if products exists in cart
    let itemIndex = cart.products.findIndex((p) => p.productId == productId);
    if (itemIndex > -1) {
      let productItem = cart.products[itemIndex];
      productItem.quantity = quantity;
      productItem.totalPrice = totalPrice;
      cart.products[itemIndex] = productItem;
    } else {
      //product does not exists in cart, add new item
      cart.products.push({ productId, quantity, totalPrice });
    }
    cart.cartPrice = cart.products.reduce(
      (acc, product) => acc + product.totalPrice,
      0
    );
    cart = await cart.save();
    return res.status(201).json({
      success: true,
      cart,
    });
  } else {
    //No cart found for user, create a new one
    const cart = await Cart.create({
      products: [{ productId, quantity, totalPrice }],
      user: userId,
      cartPrice: totalPrice,
    });

    return res.status(201).json({
      success: true,
      cart,
    });
  }
});

exports.deleteCartProduct = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;
  const userId = req.user._id;
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return next(new ErrorHandler("Cart Not Found", 404));
  }
  const productToDelete = cart.products.find((product) => {
    return product.productId == productId;
  });

  console.log("productToDelete", productToDelete);

  if (!productToDelete) {
    return next(new ErrorHandler("Product Not Found in the cart", 404));
  }

  cart.cartPrice -= productToDelete.totalPrice;

  cart.products.pull({ productId: productId });

  cart = await cart.save();

  res.status(200).json({
    success: true,
    message: "Product removed from cart",
  });
});

exports.getCartProducts = catchAsyncErrors(async (req, res) => {
  const userId = req.user._id;
  const cart = await Cart.findOne({ user: userId });
  console.log(cart);
  res.status(200).json({
    success: true,
    cart,
  });
});
