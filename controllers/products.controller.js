const db = require("../models");
const Products = db.products;
const dummyProducts = require("../products.json");

exports.seed = async (req, res) => {
  try {
    // delete all products
    await Products.destroy({ where: {} });
    // seed products
    await Products.bulkCreate(dummyProducts.data);
    return res.status(201).json({ message: "Products Seeded Successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.findAll = async (req, res) => {
  try {
    const currentPage = +req.query._page || 1;
    const pageSize = +req.query._limit || 10;
    const filteredProduct = await Products.findAll({
      offset: pageSize * (currentPage - 1),
      limit: pageSize,
    });
    const totolProducts = await Products.count();
    return res.status(200).json({
      products: filteredProduct,
      totolProducts,
      pageSize,
    });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.findOne = async (req, res) => {
  try {
    const product = await Products.findOne({ where: { id: +req.params.id } });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (e) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.create = async (req, res) => {
  const { code, name } = req.body;
  try {
    const product = await Products.create({
      code,
      name,
      description: "Product Description",
      price: 100,
      quantity: 5,
      inventoryStatus: "INSTOCK",
      category: "Category NAME",
      image: "",
      rating: 0,
    });
    return res.status(201).json(product);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong: " + err });
  }
};

exports.update = async (req, res) => {
  const { code, name } = req.body;
  try {
    await Products.update({ code, name }, { where: { id: +req.params.id } });
    return res.status(200).json({ message: "Product Updated Successfully" });
  } catch (e) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.delete = async (req, res) => {
  try {
    await Products.destroy({ where: { id: +req.params.id } });
    return res.status(204).json({ message: "Product Deleted Successfully" });
  } catch (e) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};
