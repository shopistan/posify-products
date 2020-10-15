const { Product } = require('../../models');
const all = async () => {
  const products = await Product.find({});
  return products;
};

const single = async ({ id }) => {
  const product = await Product.findOne({ _id: id });
  return product;
};

const count = async () => {
  const productCount = await Product.count({});
  return { count: productCount };
};

const create = async ({ body }) => {
  !body.quantity ? body.quantity = Math.floor(Math.random() * (20 - 5)) + 5 : body.quantity
  let product = await Product.create(body);
  return product;
};

const update = async ({ id, body }) => {
  let product = await Product.findOneAndUpdate({ _id: id }, body, {
    new: true
  });
  return product;
};

const remove = async ({ id }) => {
  await Product.deleteOne({ _id: id });
  return true;
};
module.exports = {
  all,
  single,
  count,
  create,
  update,
  remove
};
