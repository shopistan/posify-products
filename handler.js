'use strict';
const { createConnection } = require('./app/config/db');
const send = require('./app/utils/response');
const ProductsController = require('./app/controllers/products');
const { formatBody } = require('./app/utils/helpers');
// data sending in functions should be changed not the whole event should be semt in functions
const countProducts = async (event, context) => {
  createConnection();
  console.log('NODE_ENV', process.env.IS_OFFLINE);
  let response = await ProductsController.count();
  return send(response);
};

const getAllProducts = async (event, context) => {
  createConnection();
  let response = await ProductsController.all();
  return send(response);
};

const getSingleProducts = async (event, context) => {
  createConnection();
  let id = event.pathParameters.id;
  let response = await ProductsController.single({ id });
  return send(response);
};

const createProduct = async (event, context) => {
  createConnection();
  let body = JSON.parse(event.body);
  let response = await ProductsController.create({ body });
  return send(response);
};

const updateProduct = async (event, context) => {
  createConnection();
  let id = event.pathParameters.id;
  let body = JSON.parse(event.body);
  let response = await ProductsController.update({ id, body });
  return send(response);
};

const removeProduct = async (event, context) => {
  createConnection();
  let id = event.pathParameters.id;
  let response = await ProductsController.remove({ id });
  return send(response);
};

const updateInventory = async (event, context) => {
  createConnection();
  let request = formatBody(event);
  let body = JSON.parse(request.body.Sns.Message).body
  let response = await ProductsController.updateInventory({ body });
  return send(response);
};

module.exports = {
  count: countProducts,
  all: getAllProducts,
  single: getSingleProducts,
  create: createProduct,
  update: updateProduct,
  remove: removeProduct,
  updateInventory: updateInventory
};
