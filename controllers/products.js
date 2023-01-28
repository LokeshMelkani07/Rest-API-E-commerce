const getAllProducts = async (req, res) => {
  res.status(200).json({ message: "GetAllproducts" });
};

const getAllProductsTesting = async (req, res) => {
  res.status(200).json({ message: "GetAllproductsTesting" });
};

module.exports = { getAllProducts, getAllProductsTesting };
