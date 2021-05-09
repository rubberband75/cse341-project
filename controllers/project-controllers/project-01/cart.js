const Product = require('../../../models/project-models/project-01/product')
const Cart = require('../../../models/project-models/project-01/cart')

exports.getAllProducts = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(
                    prod => prod.id == product.id
                );
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }
            res.render('project-views/project-01/cart', {
                title: 'Cart',
                path: '/project/01/cart',
                products: products,
            });
        });
    });
};
