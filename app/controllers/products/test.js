const chai = require('chai');
const { expect } = chai;
chai.use(require('chai-as-promised'));
const faker = require('faker');
const ProductsController = require('./index');
const testHelper = require('../../utils/test.helper');

beforeEach(testHelper.setupTest);
let _id = "";
let testBody = {
  items: []
};
const getProductBody = () => {
  return {
    name: faker.commerce.productName(),
    sku: faker.commerce.productAdjective(),
    price: faker.commerce.price(),
    image: faker.image.imageUrl()
  };
};
describe('Products', () => {
  describe('Insert', () => {
    it('should insert product data', async () => {
      let body = getProductBody()
      const result = await ProductsController.create({ body });
      _id = result._id;
      testBody.items.push(result)
      expect(result.name).to.equal(body.name);
      expect(result.sku).to.equal(body.sku);
      expect(result.price).to.equal(parseInt(body.price));
      expect(result.image).to.equal(body.image);
      expect(result.quantity).to.greaterThan(4);
      expect(result.quantity).lessThan(21);
    });
  });
});

describe('Products', () => {
  describe('Update', () => {
    it('should update product data by _id', async () => {
      let id = _id;
      let body = getProductBody()
      const result = await ProductsController.update({ id, body });
      expect(result.name).to.equal(body.name);
      expect(result.sku).to.equal(body.sku);
      expect(result.price).to.equal(parseInt(body.price));
      expect(result.image).to.equal(body.image);
      expect(result.quantity).to.greaterThan(5);
      expect(result.quantity).lessThan(20);
    });
  });
});


describe('Products', () => {
  describe('updateInventory', () => {
    it('should update product inventory by SKU', async () => {
      testBody.method = 'sale'
      let body = testBody;
      const result = await ProductsController.updateInventory({ body });
      expect(result).to.equal(true);
    });
  });
});

describe('Products', () => {
  describe('Single', () => {
    it('should get single product data by _id', async () => {
      let id = _id;
      const result = await ProductsController.single({ id });
      expect(typeof result).to.equal('object');
    });
  });
});

describe('Products', () => {
  describe('Delete', () => {
    it('should delete product data by _id', async () => {
      let id = _id;
      const result = await ProductsController.remove({ id });
      expect(result).to.equal(true);
    });
  });
});

describe('Products', () => {
  describe('Get', () => {
    it('should return array of products', async () => {
      const result = await ProductsController.all();
      expect(typeof result).to.equal('object');
    });
    it('should return count of the products', async () => {
      const result = await ProductsController.count();
      expect(typeof result.count).to.equal('number');
    });
  });
});
