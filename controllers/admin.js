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
  req.user.createProduct({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description
  })
  .then(result=>{
    res.redirect('/admin/products')
  }).catch(err=>{
    console.log(err);
  })
} 

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.user.getProducts({where: {id: prodId}})
    .then(products => {
      const product = products[0];
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product[0]
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  /* Product.findAll({where: {id: prodId}})
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save();
    }) */
    /* const product = new Product({
       title: updatedTitle,
      price: updatedPrice,
      description: updatedDesc,
      imageUrl: updatedImageUrl
    }) */
    Product.update({
      title: updatedTitle,
      price: updatedPrice,
      description: updatedDesc,
      imageUrl: updatedImageUrl
    }, {
      where: {
        id: prodId
      }
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  console.log(productId);
  Product.destroy({where: {id: productId}}).then(()=>{
    res.redirect('/admin/products');
  }).catch((err)=>{
    console.log(err)
  }) 
}

exports.getProducts = (req, res, next) => {
  req.user.getProducts().then((rows)=>{
    res.render('admin/products', {
      prods: rows,
      pageTitle: 'Admin Product',
      path: '/admin/products'
    })
  }).catch((err)=>{
    console.log(err)
  })
}