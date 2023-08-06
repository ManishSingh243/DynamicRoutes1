const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  }); 
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save().then(
    ()=>{
      res.redirect('/');
    }
  ).catch((err)=>{
     console.log(err)
  });
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  console.log(productId);
  Product.deleteById(productId).then(()=>{
    res.redirect('/')
  }).catch((err)=>{
    console.log(err)
  }) 
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([rows, fieldData])=>{
    res.render('admin/products', {
      prods: rows,
      pageTitle: 'Admin Product',
      path: '/admin/products'
    })
  }).catch((err)=>{
    console.log(err)
  })
}