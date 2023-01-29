const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  // query.select means the fields we write in select in URL should only be shown in our docuement of the collection
  const { company, name, featured, sort, select } = req.query;
  const queryObject = {};
  if (company) {
    queryObject.company = company;
  }
  if (featured) {
    queryObject.featured = featured;
  }
  if (name) {
    // we are using mongodb regex below so that the search functioning works for both iphone and iphone10 means it considers case-senstive options also
    queryObject.name = { $regex: name, $options: "i" };
  }
  let apiData = Product.find(queryObject);
  // if there is a sort parameter in query of url then do sorting otherwise show the unfiltered data
  // we can use sort functionality of mongoose using query.sort
  // query.sort({ field: 'asc', test: -1 });
  // Sort in ascending order of name
  // by-default it sorts in ascending order
  // To sort in descending order we write '-name'
  // To sort in name,price we just pit a space, we write query as .sort("name price")
  // But in URL we write it like url?sort=name,price
  if (sort) {
    // if user wants to use sort
    // we need to replace comma with space so
    let sortFix = sort.split(",".join(" "));
    apiData = apiData.sort(sortFix);
  }

  // To select in name,price we just pit a space, we write query as .select("name price")
  // But in URL we write it like url?select=name,price
  // So we need to remove the comma
  if (select) {
    // if user wants to use select
    // we need to replace comma with space so
    let selectFix = select.split(",".join(" "));
    apiData = apiData.select(selectFix);
    // http://localhost:5000/api/products?select=name,price&sort=name
  }

  // Applying Pagination
  // In pagination we have page and limit means page number and number of posts allowed in the page
  // we get them from req.query
  // They will be of type String so we convert it to Number
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;
  // Now we write formula for our pagination
  // skip means skip these many data from the collection and show the result
  let skip = (page - 1) * limit;
  // skip and limit are function given by mongoose also
  apiData = apiData.skip(skip).limit(limit);
  // http://localhost:5000/api/products?page=2&limit=1
  console.log(queryObject);
  const Products = await apiData;
  res.status(200).json({ Products, nbHits: myData.length });
};

const getAllProductsTesting = async (req, res) => {
  // we can use req.query to do filtration,sort,pagination
  // query means whatever we write in endpoint after ?
  // if there are more than one query they are spearated by &
  // http://localhost:5000/api/products/testing?name=mi20&name=watch
  // we can use sort functionality of mongoose using query.sort
  // query.sort({ field: 'asc', test: -1 });
  const myData = await Product.find(req.query).sort("name");
  // Sort in ascending order of name
  // by-default it sorts in ascending order
  // To sort in descending order we write '-name'
  // To sort in name,price we just pit a space, we write query as .sort("name price")
  // But in URL we write it like url?sort=name,price
  console.log(req.query);
  res.status(200).json({ myData });
};

module.exports = { getAllProducts, getAllProductsTesting };
