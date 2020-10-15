'use strict';
require('./app/config/db');
const send = require('./app/utils/response');
const ProductsController = require('./app/controllers/products');
const { formatBody } = require('./app/utils/helpers');
// data sending in functions should be changed not the whole event should be semt in functions
const countProducts = async (event, context) => {
  console.log('NODE_ENV', process.env.IS_OFFLINE);
  let response = await ProductsController.count();
  return send(response);
};

const getAllProducts = async (event, context) => {
  let response = await ProductsController.all();
  return send(response);
};

const getSingleProducts = async (event, context) => {
  let id = event.pathParameters.id;
  let response = await ProductsController.single({ id });
  return send(response);
};

const createProduct = async (event, context) => {
  let body = JSON.parse(event.body);
  let response = await ProductsController.create({ body });
  return send(response);
};

const updateProduct = async (event, context) => {
  let id = event.pathParameters.id;
  let body = JSON.parse(event.body);
  let response = await ProductsController.update({ id, body });
  return send(response);
};

const removeProduct = async (event, context) => {
  let id = event.pathParameters.id;
  let response = await ProductsController.remove({ id });
  return send(response);
};
module.exports = {
  count: countProducts,
  all: getAllProducts,
  single: getSingleProducts,
  create: createProduct,
  update: updateProduct,
  remove: removeProduct
};
