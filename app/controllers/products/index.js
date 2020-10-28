const { Product } = require('../../models');
const mongoose = require('mongoose');
const all = async () => {
  const products = await Product.find({});
  return products;
};

const single = async ({ id }) => {
  try {
    const product = await Product.findOne({ _id: id });
    return product;
  }
  catch (err) {
    return { statusCode: 400, message: err.message };
  }
};

const count = async () => {
  try {
    const productCount = await Product.count({});
    return { count: productCount };
  }
  catch (err) {
    return { statusCode: 400, message: err.message };
  }
};

const create = async ({ body }) => {
  try {
    !body.quantity ? body.quantity = Math.floor(Math.random() * (20 - 5)) + 5 : body.quantity
    let product = await Product.create(body);
    return product;
  }
  catch (err) {
    return { statusCode: 400, message: err.message };
  }
};

const update = async ({ id, body }) => {
  try {
    let product = await Product.findOneAndUpdate({ _id: id }, body, {
      new: true
    });
    return product;
  }
  catch (err) {
    return { statusCode: 400, message: err.message };
  }
};

const updateInventory = async ({ body }) => {
  try {
    const session = await mongoose.startSession();
    let skus = body.items.map((item) => {
      return item.sku;
    })
    let existingInventory = await Product.find().where('sku').in(skus);
    await Promise.all(existingInventory.map(async (inventory) => {
      await Promise.all(body.items.map(async (item) => {
        if (item.sku === inventory.sku) {
          session.startTransaction();
          try {
            await Product.findOneAndUpdate({ sku: inventory.sku }, { quantity: body.method === 'sale' ? inventory.quantity - item.quantity : inventory.quantity + item.quantity })
            await session.commitTransaction();
          }
          catch (err) {
            await session.abortTransaction();
          }
        }
      }))
    }))
    session.endSession();
    return true;

  }
  catch (err) {
    return { statusCode: 400, message: err.message };
  }
};


const remove = async ({ id }) => {
  try {
    await Product.deleteOne({ _id: id });
    return true;
  }
  catch (err) {
    return { statusCode: 400, message: err.message };
  }
};
module.exports = {
  all,
  single,
  count,
  create,
  update,
  remove,
  updateInventory
};
