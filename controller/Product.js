const { Product } = require("../model/Product");

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllProducts = async (req, res) => {
  let query = Product.find({ deleted: { $ne: true } });
  let totalProductsQuery = Product.find({ deleted: { $ne: true } });

  console.log(req.query, "fetchAllProducts");

  // Sorting
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  // Filtering by categories
  if (req.query.category) {
    const categories = req.query.category.split(",");
    query = query.find({ category: { $in: categories } });
    totalProductsQuery = totalProductsQuery.find({
      category: { $in: categories },
    });
  }

  // Filtering by brands
  if (req.query.brand) {
    const brands = req.query.brand.split(",");
    query = query.find({ brand: { $in: brands } });
  }

  // Pagination
  const totalDocs = await totalProductsQuery.countDocuments().exec();

  if (req.query._page && req.query._limit) {
    const pageSize = parseInt(req.query._limit, 10);
    const page = parseInt(req.query._page, 10);
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to fetch products" });
  }
};

exports.fetchProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json(error);
  }
};
