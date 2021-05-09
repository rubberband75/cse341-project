const Product = require('../../../models/project-models/project-01/product')

exports.getAllProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('project-views/project-01/admin', {
            title: 'Admin',
            path: '/project/01/admin',
            products: products,
        });
    })
};

exports.getAddProduct = (req, res, next) => {
    res.render('project-views/project-01/admin/edit-product', {
        title: 'Add Product',
        path: '/project/01/admin',
        editing: false,
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, description, price, []);
    product.save();
    res.redirect('/project/01/admin');
};

exports.getEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId, product => {
        if (!product) {
            return res.status(404).send(`Product ${productId} not found`);
        }
        res.render('project-views/project-01/admin/edit-product', {
            title: 'Edit Product',
            path: '/project/01/admin',
            product: product,
            editing: true,
        });
    });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(
        prodId,
        updatedTitle,
        updatedImageUrl,
        updatedDesc,
        updatedPrice,
        []
    );
    console.log(updatedProduct)
    updatedProduct.save();
    res.redirect('/project/01/admin');
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.deleteById(productId);
    res.redirect('/project/01/admin');
};
