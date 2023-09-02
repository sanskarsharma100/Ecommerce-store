const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

exports.addToCart = catchAsyncErrors(async (req, res, next) => {
  const productId = req.body.productId;
  const product = await Product.findById(productId);
  const userId = req.user._id;
  let cart = await Cart.findOne({ user: userId });

  //Check whether product is out of stock
  if (product.stock == 0) {
    return next(new ErrorHandler("Product is out of Stock", 409));
  }

  //Check if cart is created or not for the current user
  if (cart) {
    //Check if products exists in cart
    let itemIndex = cart.products.findIndex((p) => p.productId == productId);

    // if product exists in cart
    if (itemIndex != -1) {
      return next(new ErrorHandler("Product Already in the Cart", 409));
    }

    //product does not exists in cart, add the product
    cart.products.push({
      productId,
      quantity: 1,
      totalPrice: product.price,
    });
    cart.cartPrice = cart.products.reduce(
      (acc, product) => acc + product.totalPrice,
      0
    );
    cart = await cart.save();
    return res.status(201).json({
      success: true,
      product,
      cart,
    });
  } else {
    //No cart found for user, create a new one
    const cart = await Cart.create({
      products: [{ productId, quantity: 1, totalPrice: product.price }],
      user: userId,
      cartPrice: product.price,
    });

    return res.status(201).json({
      success: true,
      product,
      cart,
    });
  }
});

exports.increaseProductQuantity = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;
  const userId = req.user._id;
  const product = await Product.findById(productId);
  let cart = await Cart.findOne({ user: userId });

  //If cart is not created
  if (!cart) {
    return next(new ErrorHandler("Cart Not Found", 404));
  }

  //Check if products exists in cart
  let itemIndex = cart.products.findIndex((p) => p.productId == productId);

  // If Product is not in the cart
  if (itemIndex == -1) {
    return next(new ErrorHandler("Product Not Found in the Cart", 404));
  }
  let productItem = cart.products[itemIndex];
  if (productItem.quantity + 1 > product.stock) {
    return next(
      new ErrorHandler("Product quantity exceeds available stock", 409)
    );
  }
  productItem.quantity += 1;
  productItem.totalPrice = productItem.quantity * product.price;
  cart.products[itemIndex] = productItem;

  cart.cartPrice = cart.products.reduce(
    (acc, product) => acc + product.totalPrice,
    0
  );
  cart = await cart.save();
  return res.status(201).json({
    success: true,
    message: "Product quantity increased by 1",
  });
});

exports.decreaseProductQuantity = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;
  const userId = req.user._id;
  const product = await Product.findById(productId);
  let cart = await Cart.findOne({ user: userId });

  //If cart is not created
  if (!cart) {
    return next(new ErrorHandler("Cart Not Found", 404));
  }

  //Check if products exists in cart
  let itemIndex = cart.products.findIndex((p) => p.productId == productId);

  // If Product is not in the cart
  if (itemIndex == -1) {
    return next(new ErrorHandler("Product Not Found in the Cart", 404));
  }
  let productItem = cart.products[itemIndex];
  if (productItem.quantity - 1 <= 0) {
    return next(
      new ErrorHandler("Product Quantity cannot be less than 1", 409)
    );
  }
  productItem.quantity -= 1;
  productItem.totalPrice = productItem.quantity * product.price;
  cart.products[itemIndex] = productItem;

  cart.cartPrice = cart.products.reduce(
    (acc, product) => acc + product.totalPrice,
    0
  );
  cart = await cart.save();
  return res.status(201).json({
    success: true,
    message: "Product quantity decreased by 1",
  });
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
  res.status(200).json({
    success: true,
    cart,
  });
});
