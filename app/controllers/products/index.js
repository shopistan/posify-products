const { Product } = require('../../models');

const all = async () => {
  const products = await Product.find({});
  return products;
};

const single = async ({ id }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return { statusCode: 400, message: 'Invalid ObjectId' };
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
    if (!mongoose.Types.ObjectId.isValid(id))
      return { statusCode: 400, message: 'Invalid ObjectId' };
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
    let skus = body.items.map((item) => {
      return item.sku;
    })
    let existingInventory = await Product.find().where('sku').in(skus);
    await existingInventory.map(async (inventory) => {
      await body.items.map(async (item) => {
        if (item.sku === inventory.sku) {
          await Product.findOneAndUpdate({ sku: inventory.sku }, { quantity: body.method === 'sale' ? inventory.quantity - item.quantity : inventory.quantity + item.quantity })
        }
      })
    })
    return true;
  }
  catch (err) {
    return { statusCode: 400, message: err.message };
  }
};


const remove = async ({ id }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return { statusCode: 400, message: 'Invalid ObjectId' };
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
