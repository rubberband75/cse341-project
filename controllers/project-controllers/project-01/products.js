const Product = require('../../../models/project-models/project-01/product')

exports.getAllProducts = (req, res, next) => {
    let findParams = {}
    if (req.query.tag) findParams = { tags: req.query.tag }
    Product.find(findParams)
        .then(products => {
            res.render('project-views/project-01/shop', {
                title: 'Shop',
                path: '/project/01/shop',
                products: products,
                tag: req.query.tag
            });
        })
        .catch(err => console.error(err));
};


exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId)
        .then(product => {
            res.render('project-views/project-01/products/product-detail', {
                title: product.title,
                path: '/project/01/products',
                product: product,
            });
        })
        .catch(err => console.error(err));
};