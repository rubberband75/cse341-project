const Product = require('../../../models/project-models/project-01/product')

exports.getAllProducts = (req, res, next) => {
    if (req.query.tag) {
        Product.findByTag(req.query.tag, products => {
            res.render('project-views/project-01/products', {
                title: 'Products',
                path: '/project/01/products',
                products: products,
                tag: req.query.tag
            });
        })
    } else {
        Product.fetchAll(products => {
            res.render('project-views/project-01/products', {
                title: 'Products',
                path: '/project/01/products',
                products: products,
                tag: null
            });
        })
    }
};


exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId, product => {
        res.render('project-views/project-01/products/product-detail', {
            title: product.title,
            path: '/project/01/products',
            product: product,
        });
    });
};